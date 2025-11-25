Run the helper script to update npm dist-tags:

```bash
cd scripts
sh dist-tags.sh <version> <tag>
```

Run this from the repository root to tag the current packages.

## Security checks

The Shai-Hulud 2.0 worm compromises a long list of npm packages. Audit the lockfile and workspace manifests against the most recent compromise list with:

```bash
node scripts/security/check-shai-hulud.mjs
```
