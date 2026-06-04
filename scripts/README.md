# Scripts Overview

## license-reports.mjs

Generate and merge all package license reports into one Markdown file:

```bash
pnpm license:report
```

The script uses `pnpm license-report` internally for every package and fails with a non-zero exit code if one report cannot be generated or parsed.

## dist-tags.sh

Run the helper script to update npm dist-tags:

```bash
cd scripts
sh dist-tags.sh <action> <version> <tag>
```

Run this from the repository root to tag the current packages.

## deprecate-add.sh

Add deprecation warnings to package versions:

```bash
cd scripts
sh deprecate-add.sh <version> <recommended-version>
```

Example: `sh deprecate-add.sh 2.1.0 2.2.0`

## deprecate-rm.sh

Remove deprecation warnings from package versions:

```bash
cd scripts
sh deprecate-rm.sh <version>
```

Example: `sh deprecate-rm.sh 2.1.0`

## unpublish.sh

**⚠️ DANGER: Use with extreme caution!**

Unpublish specific versions of all packages:

```bash
cd scripts
sh unpublish.sh <version>
```

Example: `sh unpublish.sh 2.1.0-beta.1`

**Note:** npm unpublish can only be used within 72 hours of publication and may break dependent projects. Consider using deprecation instead.
