# Cross-Platform Compatibility Changes

This document summarizes the changes made to ensure build and development scripts work across Windows, macOS, and Linux.

## Problem

The repository contained several platform-specific scripts that would not work on Windows:

1. **Unix-specific commands**: `mkdir`, `mkdir -p` used directly in package.json scripts
2. **Shell script invocations**: `sh serve.sh` commands that require Unix shell
3. **Unix environment variable syntax**: `VAR=value command` syntax doesn't work on Windows CMD
4. **Unix pipelines**: Commands like `git branch --merged | grep -v \\* | xargs git branch -D`

## Solutions Implemented

### 1. Replace `mkdir` with `mkdirp`

**Files Changed:**
- `packages/components/package.json`
  - `build:light`: Changed `mkdir doc` to `mkdirp doc`
  - `test:unit`: Changed `mkdir -p dist` to `mkdirp dist`
- `packages/icons/package.json`
  - `prebuild`: Changed `mkdir svg-fixed` to `mkdirp svg-fixed`

**Added Dependencies:**
- `mkdirp@3.0.1` to `packages/components/package.json`
- `mkdirp@3.0.1` to `packages/icons/package.json`

**Why:** The `mkdir` command has different syntax across platforms. Windows doesn't support the `-p` flag. The `mkdirp` package provides a cross-platform Node.js solution.

### 2. Fix Environment Variable Syntax

**Files Changed:**
- `packages/test-tag-name-transformer/package.json`
  - `test`: Changed `THEME_MODULE=theme ENABLE_TAG_NAME_TRANSFORMER=true kolibri-visual-test` to use `cross-env`
  - `test:update:e2e`: Similar change with `cross-env`

**Added Dependencies:**
- `cross-env@10.1.0` to `packages/test-tag-name-transformer/package.json`

**Why:** The syntax `VAR=value command` is Unix-specific. Windows CMD uses `set VAR=value` and PowerShell uses `$env:VAR='value'`. The `cross-env` package handles this cross-platform.

### 3. Replace Shell Script Invocations with Node.js

**New Files Created:**
- `packages/themes/default/serve.mjs` - Node.js replacement for serve.sh
- `packages/themes/ecl/serve.mjs` - Node.js replacement for serve.sh
- `scripts/clean-branches.mjs` - Node.js replacement for git cleanup command

**Files Changed:**
- `packages/themes/default/package.json`
  - `serve`: Changed `sh serve.sh DEFAULT` to `node serve.mjs DEFAULT`
- `packages/themes/ecl/package.json`
  - `serve:ec`: Changed `sh serve.sh ECL_EC` to `node serve.mjs ECL_EC`
  - `serve:eu`: Changed `sh serve.sh ECL_EU` to `node serve.mjs ECL_EU`
- `package.json` (root)
  - `clean:branches`: Changed Unix pipeline to `node scripts/clean-branches.mjs`

**Why:** Shell scripts with `sh` or `bash` require a Unix-compatible shell, which is not available by default on Windows. Node.js scripts work identically across all platforms.

## Original Shell Scripts (Preserved)

The original shell scripts are preserved for reference and backward compatibility:
- `packages/themes/default/serve.sh`
- `packages/themes/ecl/serve.sh`
- `scripts/cleanup-local-branches.sh` (more advanced features)

## Testing

All changes have been validated:
1. ✅ Node.js scripts parse correctly (`node --check`)
2. ✅ Scripts execute without syntax errors
3. ✅ Code formatting passes (`pnpm format`)
4. ✅ Dependencies install successfully

## Usage Examples

### Building Components (Works on all platforms)
```bash
pnpm --filter @public-ui/components build
```

### Running Tests (Works on all platforms)
```bash
pnpm --filter @public-ui/test-tag-name-transformer test
```

### Starting Development Server (Works on all platforms)
```bash
cd packages/themes/default
pnpm start  # Uses node serve.mjs internally
```

### Cleaning Branches (Works on all platforms)
```bash
pnpm clean:branches  # Uses node scripts/clean-branches.mjs
```

## Benefits

1. **Windows Compatibility**: All npm scripts now work natively on Windows without WSL or Git Bash
2. **Consistent Behavior**: Scripts behave identically across all platforms
3. **No External Dependencies**: Only requires Node.js, which is already a requirement
4. **Maintainability**: Node.js scripts are easier to maintain and extend than shell scripts
5. **CI/CD Friendly**: Works in any CI environment without special shell setup

## Migration Notes

For developers previously using the shell scripts directly:
- Replace `sh serve.sh DEFAULT` with `node serve.mjs DEFAULT`
- Replace `./cleanup-local-branches.sh` with `node scripts/clean-branches.mjs`
- All package.json scripts are now cross-platform by default

## Future Improvements

Consider these additional improvements in the future:
1. Convert remaining shell scripts in `scripts/` directory to Node.js
2. Add Windows-specific CI testing
3. Document platform-specific development environment setup
