# Shai-Hulud 2.0 dependency audit

Issue [#8906](https://github.com/public-ui/kolibri/issues/8906) reports an active npm supply-chain attack affecting hundreds of published packages. This audit validates that the current branch does not reference any of the compromised packages.

## How the audit works

1. `scripts/security/check-shai-hulud.mjs` downloads the issue description to retrieve the latest compromised package list (falling back to `scripts/security/shai-hulud-2-packages.txt` if the API is unreachable).
2. The script scans `pnpm-lock.yaml` for resolved packages and all workspace `package.json` manifests for direct references.
3. The script exits with a non-zero status when a compromised dependency is detected and prints the matches.

Run the check from the repository root:

```bash
node scripts/security/check-shai-hulud.mjs
```

## Result

Date: 2025-11-25

The audit found **no compromised dependencies** in this branch using the cached package list.
