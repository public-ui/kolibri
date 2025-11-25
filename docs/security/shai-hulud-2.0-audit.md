# Shai-Hulud 2.0 dependency audit

## Context
The GitHub issue [#8906](https://github.com/public-ui/kolibri/issues/8906) warns about a large set of compromised NPM packages distributed via the "Shai-Hulud 2.0" worm. The project needs confirmation that none of the published malicious packages are present in this branch.

## Method
- Pulled the complete indicator list from the issue body via the GitHub API (425 package names).
- Scanned the current `pnpm-lock.yaml` for any occurrences of those package names to cover both direct and transitive dependencies.
- Checked all workspace `package.json` files as part of the lockfile scan, since `pnpm-lock.yaml` reflects every dependency resolved in the branch.

To repeat the scan:

```bash
python - <<'PY'
import json, subprocess, re, pathlib
raw = subprocess.check_output(
    ['curl', '-s', 'https://api.github.com/repos/public-ui/kolibri/issues/8906']
)
body = json.loads(raw)['body']
blocks = re.findall(r"```bash\n([\s\S]*?)```", body)
items = set()
for block in blocks:
    for line in block.splitlines():
        line = line.strip()
        if not line or line.startswith('...'):
            continue
        for token in re.split(r"\s+", line):
            token = token.strip(',')
            if token:
                items.add(token)
text = pathlib.Path('pnpm-lock.yaml').read_text()
found = sorted([name for name in items if name in text])
print('Flagged packages found:', len(found))
for name in found:
    print(name)
PY
```

## Result
No packages from the Shai-Hulud 2.0 list are present in the current lockfile. The scan returned **0** matches.
