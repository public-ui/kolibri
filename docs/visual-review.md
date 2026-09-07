# Visual Review

How screenshot changes of the KoliBri themes are detected, published and approved.

## In one picture

```
push to develop ──► Visual Baseline workflow ──► artifact visual-baseline-<package> (per commit, 90 days)

pull request push ──► CI-Pipeline, job visual-tests (<package>)
                        compares against the baseline of the base commit
                        ──► artifact visual-review-<package> (report.json + changed images)
                                  │
                                  ▼
                       Visual Review workflow (base repository context)
                         publishes visual/pr-<n>/ on GitHub Pages
                         reads the reviewers' comments
                         sets the commit status "Visual Review"
                                  │
                                  ▼
reviewer ──► https://public-ui.github.io/kolibri/visual/?pr=<n>
               inspects baseline / actual / diff, approves or rejects, leaves notes
               saves the review as a pull-request comment (directly with a token, or by pasting it)
```

## What a contributor sees

- The job `visual-tests (<package>)` of the CI-Pipeline fails when screenshots differ – that is
  expected and not something to "fix" by regenerating snapshots. The job summary lists what changed.
- The bot comment **📸 Visual Review** on the pull request links the review page and shows the counts
  per package.
- The commit status **Visual Review** stays `pending` until a reviewer with write access approved every
  changed, added and removed screenshot, turns `success` then, and `failure` when a screenshot was
  rejected or a route could not be compared at all (missing block, timeout).
- Docs-only pull requests get `success` immediately; nothing to review.

Nothing has to be committed: the baseline is regenerated from `develop` after the merge.

## What a reviewer does

1. Open the review page from the bot comment (or the status link).
2. Walk through the changed, added and removed snapshots (`j`/`k` or the list). Compare with
   _side by side_, _slider_, _onion skin_, _diff_ or _blink_; zoom in for subpixel changes.
3. Approve (`a`), reject or annotate each one – or **Approve all open changes** for an intentional
   sweep such as a browser upgrade.
4. Save the review:
   - **with a token**: enter a fine-grained personal access token with _Pull requests: read and write_
     for `public-ui/kolibri` at the bottom of the page. The page posts (and later edits) one comment
     in your name. The token stays in this browser session unless you tick "remember".
   - **without a token**: click _Copy comment for the pull request_ and paste it as a comment on the
     pull request.

The comment carries a machine-readable block, for example:

```markdown
<!-- visual-review:v1
{"approveAll":{"digest":"sha256:…"},"approvals":[{"item":"theme-default/button-basic--variants","hash":"sha256:…"}],"rejects":[],"notes":[]}
-->

**Visual Review** – all changes approved ([review page](…))
```

Approvals bind to the **content hash** of a screenshot, not to a commit: a later push that leaves an
approved screenshot untouched keeps its approval, a push that changes it again reopens exactly that
one. `approveAll` binds to the digest of the whole report and therefore expires with the next change.

Only comments of users with write access count. Bots are ignored. A rejection wins over an approval.

## Where things live

| What                             | Where                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| Report per package (CI artifact) | `visual-review-<package>` – `report.json` + PNGs of changed items, 14 days            |
| Baseline per base commit         | `visual-baseline-<package>` – snapshots + `meta.json`, 90 days                        |
| Published review data            | `gh-pages`: `visual/pr-<n>/report.json`, `status.json`, `<package>/<name>.<kind>.png` |
| Review page                      | `gh-pages`: `visual/` (built from `packages/tools/visual-tests/review-ui`)            |
| Reporter                         | `packages/tools/visual-tests/src/visual-reporter.js`                                  |
| Workflow scripts                 | `scripts/visual-review/` (see `scripts/README.md`)                                    |
| Workflows                        | `visual-baseline.yml`, `visual-review.yml`, `visual-review-ui.yml`, job in `ci.yml`   |

The folder `visual/pr-<n>/` is removed when the pull request closes (`pr-preview-cleanup.yml`).

## Trust boundary

The reports come from the pull request's own CI run, i.e. from code the pull request controls. The
Visual Review workflow never executes that code: it downloads the artifacts, validates every field and
file name (`merge-reports.mjs`) and publishes only what passes. A pull request could still upload a
report that claims "no changes" – the human review of the code and the branch protection remain the
actual safeguard; the visual review makes intentional changes visible and reviewable, it does not
replace code review.

## Local work

```bash
pnpm snapshots:pull                        # fetch the current develop baseline into the snapshot folders
pnpm --filter @public-ui/theme-default test
pnpm --filter @public-ui/visual-tests review-ui:dev   # the review page against a local report: ?src=<folder>
```

`pnpm test:update:docker <theme>` regenerates a baseline locally in the pinned Playwright container.
