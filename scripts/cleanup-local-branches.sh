#!/usr/bin/env zsh
# cleanup-local-branches.sh
# Safescript to clean up old local git branches.
# Usage: run from a git repo root. Default is a dry-run; use --do-it to actually delete.

set -euo pipefail
IFS=$'\n\t'

PROGNAME=$(basename $0)

print_usage() {
  cat <<EOF
Usage: $PROGNAME [options]

Options:
  --prune                Run 'git fetch --prune' before any listing (recommended)
  --delete-gone          Delete local branches whose upstream REMOTE branch is gone
  --delete-merged        Delete local branches already merged into the main branch
  --delete-all-except    Delete all local branches except keep-list and current (force)
  --keep <list>          Comma-separated list of branches to keep (default: develop,release/*)
  --main <name>          Name of your main branch (default: develop)
  --backup <file>        Path to write a backup file with branch names and commit hashes
  --do-it                Actually delete branches. Without this flag script runs in dry-run mode.
  --force                Use force deletion (-D) instead of safe deletion (-d) when removing branches
  --yes                  Skip confirmation prompt (useful for automation)
  -h, --help             Show this help and exit

Examples:
  # Dry-run: show orphaned remote branches
  $PROGNAME --prune --delete-gone

  # Actually delete orphaned remote branches (safe delete)
  $PROGNAME --prune --delete-gone --do-it

  # Delete merged branches (except main/master/develop) after dry-run
  $PROGNAME --delete-merged

  # Backup branch list then force-delete everything except main and current
  $PROGNAME --backup ~/branches.txt --delete-all-except --do-it --force
EOF
}

# Default configuration
PRUNE=false
DELETE_GONE=false
DELETE_MERGED=false
DELETE_ALL_EXCEPT=false
KEEP_LIST="develop,release/*"
MAIN_BRANCH=""
DO_IT=false
FORCE=false
BACKUP_FILE=""
YES=false

# Parse args (simple loop)
while [[ $# -gt 0 ]]; do
  case $1 in
    --prune) PRUNE=true; shift ;;
    --delete-gone) DELETE_GONE=true; shift ;;
    --delete-merged) DELETE_MERGED=true; shift ;;
    --delete-all-except) DELETE_ALL_EXCEPT=true; shift ;;
    --keep) KEEP_LIST=$2; shift 2 ;;
    --main) MAIN_BRANCH=$2; shift 2 ;;
    --backup) BACKUP_FILE=$2; shift 2 ;;
    --do-it) DO_IT=true; shift ;;
    --force) FORCE=true; shift ;;
    --yes) YES=true; shift ;;
    -h|--help) print_usage; exit 0 ;;
    *) echo "Unknown option: $1"; print_usage; exit 2 ;;
  esac
done

# Ensure we are in a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "Error: This script must be run inside a git repository root." >&2
  exit 1
fi

# Auto-detect main branch if not provided
if [[ -z "$MAIN_BRANCH" ]]; then
  if git show-ref --verify --quiet refs/heads/develop; then
    MAIN_BRANCH=develop
  else
    # fallback to current
    MAIN_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  fi
fi

# Compute current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Helper: backup current local branches and their tip commit hashes
backup_branches() {
  echo "Backing up local branches -> $BACKUP_FILE"
  echo "# Branch backup created: $(date)" >| "$BACKUP_FILE"
  git for-each-ref --format='%(refname:short) %(objectname:short) %(authorname) %(authordate:iso8601)' refs/heads/ >> "$BACKUP_FILE"
  echo "Backup written. You can recreate a branch with: git branch <name> <commit>" >> "$BACKUP_FILE"
}

# Run prune if requested
if $PRUNE; then
  echo "Running git fetch --prune ..."
  git fetch --prune
fi

# Prepare keep-regex from comma-separated list (supports glob patterns like release/*)
KEEP_REGEX=$(echo "$KEEP_LIST" | awk -F',' '{for(i=1;i<=NF;i++){gsub(/^[ \t]+|[ \t]+$/,"",$i);if($i!=""){gsub(/\*/,".*",$i);a[a_count++]=$i}}} END{for(j=0;j<a_count;j++){printf "%s%s",(j?"|":""),"^"a[j]"$"}}')

# Collect lists
branches_to_delete=()

# 1) orphaned Remote branches (upstream gone)
if $DELETE_GONE; then
  echo "Scanning for local branches whose upstream is gone..."
  gone_list=()
  while IFS= read -r line; do
    gone_list+=("$line")
  done < <(git branch -vv | awk '/: gone]/{print $1}')
  if [[ ${#gone_list[@]} -eq 0 ]]; then
    echo "No branches with gone upstream found."
  else
    echo "Found ${#gone_list[@]} gone branches:"; printf '%s\n' "${gone_list[@]}"
    branches_to_delete+=("${gone_list[@]}")
  fi
fi

# 2) branches merged into main
if $DELETE_MERGED; then
  echo "Scanning for branches merged into '$MAIN_BRANCH'..."
  merged_list=()
  while IFS= read -r line; do
    [[ -n "$line" ]] && merged_list+=("$line")
  done < <(git branch --merged "$MAIN_BRANCH" | sed 's/^[ *]*//' | grep -Ev "^($MAIN_BRANCH|$CURRENT_BRANCH)$" | grep -Ev "$KEEP_REGEX" || true)
  if [[ ${#merged_list[@]} -eq 0 ]]; then
    echo "No merged branches (that match criteria) found."
  else
    echo "Found ${#merged_list[@]} merged branches:"; printf '%s\n' "${merged_list[@]}"
    branches_to_delete+=("${merged_list[@]}")
  fi
fi

# 3) delete all except keep list and current
if $DELETE_ALL_EXCEPT; then
  echo "Preparing to delete ALL local branches except keep-list and current branch '$CURRENT_BRANCH'..."
  all_list=()
  while IFS= read -r line; do
    [[ -n "$line" ]] && all_list+=("$line")
  done < <(git branch --format='%(refname:short)' | grep -Ev "^($CURRENT_BRANCH)$" | grep -Ev "$KEEP_REGEX" || true)
  if [[ ${#all_list[@]} -eq 0 ]]; then
    echo "No branches to delete by --delete-all-except."
  else
    echo "Found ${#all_list[@]} branches to delete:"; printf '%s\n' "${all_list[@]}"
    branches_to_delete+=("${all_list[@]}")
  fi
fi

# Unique and sort branches_to_delete
if [[ ${#branches_to_delete[@]} -gt 0 ]]; then
  # Deduplicate using associative array (more robust than awk)
  declare -A seen
  uniq_list=()
  for b in "${branches_to_delete[@]}"; do
    if [[ -z "${seen[$b]:-}" ]]; then
      seen[$b]=1
      uniq_list+=("$b")
    fi
  done
else
  uniq_list=()
fi

if [[ ${#uniq_list[@]} -eq 0 ]]; then
  echo "Nothing to delete based on the selected options.";
  exit 0
fi

# Show summary
echo "\nSummary: ${#uniq_list[@]} branches selected for deletion:";
printf '%s\n' "${uniq_list[@]}"

# Dry-run or perform
if ! $DO_IT; then
  echo "\nDRY-RUN: No branches will be deleted. Rerun with --do-it to actually remove them."
  exit 0
fi

# Backup before deletion
if [[ -z "$BACKUP_FILE" ]]; then
  BACKUP_FILE="$HOME/branches-backup-$(date +%Y%m%d-%H%M%S).txt"
fi
backup_branches

# Ask for final confirmation unless --yes provided
if ! $YES; then
  read "confirm?Proceed to delete the listed branches? (y/N): "
  if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    echo "Aborted by user. No branches deleted.";
    exit 0
  fi
fi

# Choose deletion flag
DELFLAG='-d'
if $FORCE; then
  DELFLAG='-D'
fi

# Perform deletion
for b in "${uniq_list[@]}"; do
  echo "Deleting branch: $b"
  if git show-ref --verify --quiet "refs/heads/$b"; then
    git branch $DELFLAG "$b" || echo "Failed to delete $b (you can try git branch -D $b)"
  else
    echo "Branch $b does not exist locally anymore. Skipping."
  fi
done

echo "Done. If you need to restore a branch, inspect the backup file: $BACKUP_FILE"
exit 0
