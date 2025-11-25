# Shai-Hulud 2.0 dependency audit

## Overview
- **Context:** Investigated potential exposure to the "Shai-Hulud 2.0" NPM worm as described in issue #8906.
- **Data source:** Parsed the IoC package list from the GitHub issue body to avoid omissions and to use the same canonical source.

## Audit steps
1. Downloaded the issue body (`https://github.com/public-ui/kolibri/issues/8906`) and extracted the package list between the fenced code blocks.
2. Counted **425** unique package names provided as indicators of compromise.
3. Scanned the current `pnpm-lock.yaml` for any occurrences of those package names to detect direct or transitive usage.
4. Attempted an online `pnpm audit --prod --json` for additional vulnerability signals (blocked by the upstream audit endpoint; see notes below).

## Results
- **Matches found in pnpm-lock.yaml:** 0 of 425.
- **Status:** No dependencies from the published Shai-Hulud 2.0 IoC list are present in this branch's lockfile.

## Re-run instructions
- Ensure `/tmp/issue-8906.txt` contains the latest issue body (update with `curl -s https://api.github.com/repos/public-ui/kolibri/issues/8906 | jq -r '.body' > /tmp/issue-8906.txt`).
- Then run:

```bash
python - <<'PY'
import re, pathlib
issue = pathlib.Path('/tmp/issue-8906.txt').read_text()
block_match = re.search(r"```bash\n(.*?)\n```", issue, re.S)
packages = [line.strip() for line in block_match.group(1).splitlines() if line.strip()]
lock_text = pathlib.Path('pnpm-lock.yaml').read_text()
found = [pkg for pkg in packages if pkg in lock_text]
print(f"Packages listed: {len(packages)}")
print(f"Found matches: {len(found)}")
if found:
    print('\n'.join(found))
PY
```

## Notes
- `pnpm audit --prod --json` currently fails with `ERR_PNPM_AUDIT_BAD_RESPONSE` (403 Method forbidden) due to the upstream audit API, so no additional CVE data could be pulled from npm for this run. Repeat the audit once the endpoint is available.
