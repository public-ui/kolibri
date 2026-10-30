---
name: release-integration
description: Integriert einen Release-LTS-Branch (Standard `release/4`) in den `develop`-Branch des KoliBri-Repos, löst Merge-Konflikte nach den Repo-Regeln auf und erstellt einen Pull Request gegen develop. Nutze diesen Skill immer, wenn der Nutzer release/4 integrieren, zurückmergen oder mit develop synchronisieren will – auch bei Formulierungen wie "merge release/4 in develop", "hol die Fixes aus dem LTS-Branch nach develop", "Backports übernehmen", "bring release/4 in develop", "gibt es Konflikte zwischen release/4 und develop", "aktualisiere den Integrations-PR" oder wenn die Divergenz der beiden Branches ohne weitere Anweisung gezeigt wird. Der Ziel-Branch ist immer develop; ein anderer Release-Branch (z. B. release/2) wird als Parameter akzeptiert. Der Skill macht niemals selbst Approvals oder Merges.
---

# Release-Branch in develop integrieren

Ein Release-LTS-Branch (Standard: `release/4`) sammelt Fixes, die `develop` (v5-Beta) noch nicht hat.
Dieser Skill bringt sie per Merge in einen Integrations-Branch, löst Konflikte nach den Regeln des
Repos auf, verifiziert das Ergebnis und stellt einen Pull Request gegen `develop`.

Aufruf: `/release-integration [release/4]`

- Ohne Parameter gilt `release/4` als Quell-Branch, Ziel ist immer `origin/develop`.
- Es gibt nur einen Ablauf. Ein bereits offener Integrations-PR wird fortgeführt statt neu angelegt.

## 1. Vorbereitung und Stand ermitteln (liest nur)

```bash
git fetch origin --prune
git branch --show-current
git rev-list --left-right --count origin/develop...origin/release/4
git log --oneline origin/develop..origin/release/4
git merge-tree --write-tree origin/develop origin/release/4
```

- **Arbeitsbaum:** Bei parallelen Sessions kann der Hauptbaum belegt sein. Vor jedem Schreibzugriff
  und vor jedem Commit `git branch --show-current` prüfen; ist ein anderer Branch ausgecheckt, in
  einem `git worktree` arbeiten.
- **Divergenz:** Die Zahlen links (develop) und rechts (release/4) nennen. Die Commit-Liste rechts
  ist der Inhalt der Integration und wandert später in den PR.
- **Konfliktvorschau:** Listet `merge-tree` Dateien, sind das die erwarteten Konflikte (Abschnitt 4).
  Listet sie keine, kann der Merge trotzdem scheitern – die Vorschau ersetzt den echten Merge nicht.
- **Bereits angewendete Fixes:** `git cherry origin/develop origin/release/4` zeigt Commits mit `-`,
  deren Inhalt develop schon hat (z. B. per Cherry-Pick). Sie erwarten keinen Konflikt, erklären aber,
  warum die Commit-Zahl größer sein kann als die tatsächliche Änderung.

## 2. Integrations-Branch anlegen oder fortführen

- Name nach Präzedenz (`merge/release-3-in-develop`): **`merge/release-4-in-develop`**. Gibt es den
  Branch bereits (offener Integrations-PR), ihn wiederverwenden; ist er durch einen Merge gelöscht,
  neu anlegen.
- Suchen offener Integrations-PRs: `gh pr list --repo public-ui/kolibri --base develop --head merge/release-4-in-develop --state open`.
- Neu anlegen, immer von `origin/develop`:

  ```bash
  git switch -c merge/release-4-in-develop origin/develop
  git log -1 --oneline
  ```

  Mit dem letzten Befehl verifizieren, dass der Branch wirklich auf dem aktuellen
  `origin/develop`-Head liegt (parallele Sessions bewegen den Hauptbaum).

- Einen bestehenden Branch **nie rebasen oder force-pushen** – Konfliktlösungen bleiben erhalten, der
  Branch wird nur durch weitere Merges aktualisiert.
- Rückt `origin/release/4` während der Integration nach und es gibt eine zweite Merge-Runde in
  denselben Branch, die Verifikation aus Abschnitt 5 vollständig wiederholen. Auflösungen aus der
  ersten Runde maskieren neue Abweichungen nicht: Git meldet Konflikte, keine stillen Abweichungen
  (Präzedenz #11452, zweite Runde `3ffa209`).

## 3. Merge ausführen

```bash
git merge --no-ff origin/release/4 -m "chore: merge release/4 in develop"
```

- Immer `origin/release/4` verwenden, nie den lokalen Branch.
- Läuft der Merge durch, direkt mit Abschnitt 5 weitermachen.
- Scheitert er, listet `git status` die konfligierten Dateien; auflösen nach Abschnitt 4.

## 4. Konflikte auflösen

Richtung ist festgelegt, weil `origin/release/4` **in** einen Branch auf Basis von `develop` gemergt
wird: `--ours` meint develop, `--theirs` meint release/4.

**Grundsatz:** develop ist der Zielstand. Der Fix-Inhalt aus release/4 wird portiert, ohne
v5-eigene Änderungen von develop zu verlieren. Nie eine Seite blind mit `--ours`/`--theirs`
übernehmen; jede Datei einzeln entscheiden und die Entscheidung für den PR notieren.

**Stille Annahmen:** Git meldet nur Dateien als Konflikt, die **beide** Seiten seit der Merge-Basis
geändert haben. Dateien, die nur release/4 ändert, übernimmt der Merge automatisch in der
release/4-Version; behält der Autor dort von Hand den develop-Stand oder verwirft eine
release/4-Änderung, erscheint das weder in `git status` noch in `git log --merge` als Konflikt.
Genau so verlor #11452 eine Docs-Zeile, ein Howto und die Sample-Entfernung aus #11336. Solche
Entscheidungen sind erlaubt, aber sie müssen bewusst fallen, in die Konfliktauflösungs-Liste des PR
(Abschnitt 6) und werden von der Verifikation in Abschnitt 5, Schritt 6 gefunden.

Je Konflikt zunächst beide Seiten verstehen:

```bash
git log --merge --oneline -- <datei>
git show :2:<datei>   # unsere Seite (develop)
git show :3:<datei>   # deren Seite (release/4)
```

### 4.1 Repo-spezifische Konfliktklassen

| Konflikt                                                                | Auflösung                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm-lock.yaml`                                                        | Nie von Hand auflösen. Beliebige Seite nehmen und danach `pnpm i` laufen lassen, damit der Lockfile neu generiert wird.                                                                                                                |
| Versionsfelder in `package.json`                                        | develop-Version behalten (v5-Beta, kein Zurückfallen auf die v4.x-Versionsnummer). Ändert release/4 eine Abhängigkeit, die develop auch braucht, gezielt übernehmen – nur exakte Versionen, nie Ranges, nie ein `packageManager`-Feld. |
| `packages/components/src/locales/de.ts`, `en.ts`, `schema/i18n-keys.ts` | Die drei Dateien bleiben synchron: jeder Key in `i18n-keys.ts` existiert in beiden Locale-Dateien. Ein neuer Key aus release/4 wird in allen drei Dateien übernommen.                                                                  |
| Jest-Text-Snapshots (`*.snap`, Hydrate-Snapshots)                       | Markup hat sich geändert? Nach der Auflösung `pnpm --filter @public-ui/components test:update:unit` laufen lassen und die Snapshot-Diffs inhaltlich prüfen, nicht blind akzeptieren.                                                   |
| Visual-Snapshots                                                        | Lokal nie aktualisieren – das Plattform-Suffix erlaubt das nur in CI. Meldet die Pipeline Drift, `gh workflow run update-snapshots.yml --ref merge/release-4-in-develop` ausführen.                                                    |
| CI-Workflows (`.github/`)                                               | release/4 bereitet LTS-Pipelines auf, develop die v5-Pipelines. Nur übernehmen, was für develop gilt; im Zweifel die develop-Seite behalten und die Abweichung im PR dokumentieren.                                                    |

### 4.2 Verlorene Imports prüfen (Pflicht nach jedem Konflikt)

Git nimmt in nicht konfligierenden Regionen stillschweigend die eine oder andere Import-Zeile an.
Deshalb nach der Auflösung in **jeder** geänderten Datei die Imports gegen beide Eltern prüfen:

```bash
git diff origin/develop -- <datei>
git diff origin/release/4 -- <datei>
```

Fehlende oder doppelt übernommene Imports sind die häufigsten Folgefehler und fallen spätestens beim
Lint/Build auf – sie vorher selbst suchen, statt sie dem CI zu überlassen.

### 4.3 Was in Konfliktlösungen verboten ist

- Keine Lint- oder Format-Regeln inline deaktivieren, um einen Konflikt "grün" zu bekommen.
- Keine Historien-Kommentare ("aus release/4 übernommen", "während des Merges geändert") im Code.
- Keine Zusatz-Refactorings, die kein Konflikt erfordert – der PR enthält nur Merge und Auflösung.

### 4.4 Zusammengehörige Dateien aus demselben Stand übernehmen

Fix und Regressionstest, Komponente und Snapshots, Schema und Locales sind Paare: Kommt eine
Änderung aus release/4, kommen ihre Prüfungen aus demselben Stand mit, und umgekehrt. Code aus
release/4 mit der Spec aus einem älteren Mischstand zu behalten ist keine Auflösung, sondern ein
stiller Testverlust. Präzedenz #11452: `behavior.ts` kam mit `event.stopPropagation()`, die
`behavior.spec.ts` ohne die beiden Assertionen aus #11313. Passt ein Paar nach der Auflösung nicht
zusammen, beide Dateien mit `git checkout origin/release/4 -- <datei>` auf den Quell-Stand bringen
oder beide auf dem develop-Stand lassen.

## 5. Verifizieren und Merge-Commit abschließen

1. Konflikte stagen mit `git add -u` oder expliziten Pfaden. **Nie `git add -A`** – `.zcode/` ist
   untracked und darf nicht in den Commit.
2. War `pnpm-lock.yaml` oder ein `package.json` beteiligt: `pnpm i` an der Wurzel.
3. `pnpm format` (bei nur einem betroffenen Paket `pnpm --filter <package> format`), danach erneut
   `git add -u`, damit das formatierte Ergebnis committed wird.
4. SCSS beteiligt: `pnpm lint:stylelint --fix`.
5. `pnpm lint` und die Unit-Tests der geänderten Pakete (meist `pnpm --filter @public-ui/components test:unit`,
   bei umfangreichen Merges `pnpm test`). Tests bauen implizit – kein separater Build, kein Build
   neben einem laufenden Watcher.
6. **Treue gegen beide Eltern verifizieren (Pflicht, auch wenn Git keinen Konflikt gemeldet hat):**
   Der PR-Diff gegen develop zeigt still geschluckte release/4-Änderungen nicht. Deshalb das
   Ergebnis gegen die Quelle vergleichen:

   ```bash
   git diff --name-only origin/release/4 | sort > /tmp/abweichungen.txt
   git diff --name-only $(git merge-base origin/develop origin/release/4) origin/develop | sort > /tmp/develop-seite.txt
   comm -23 /tmp/abweichungen.txt /tmp/develop-seite.txt
   ```

   Jede Datei in der letzten Liste weicht vom release/4-Stand ab, ohne dass develop sie seit der
   Merge-Basis geändert hat: eine Handentscheidung des Merge-Autors. Jede einzeln prüfen und in der
   Konfliktauflösungs-Liste des PR dokumentieren; ist eine Abweichung unbeabsichtigt, die Datei mit
   `git checkout origin/release/4 -- <datei>` auf den Quell-Stand bringen (Paarregel, Abschnitt 4.4).

7. Merge abschließen:

   ```bash
   git commit --no-edit   # oder eigene Merge-Message, siehe Abschnitt 3
   ```

## 6. Pull Request erstellen und Auto-Merge bewaffnen

```bash
git push -u origin merge/release-4-in-develop
gh pr create --repo public-ui/kolibri --base develop --head merge/release-4-in-develop \
  --title "chore: merge release/4 in develop" --label release:engineering --body-file <body.md>
```

- **Titel** nach Präzedenz (#8847, #9182, #8936): `chore: merge release/4 in develop`.
- Die Konfliktauflösungs-Liste im Body muss **jede** Abweichung aus der Verifikation (Abschnitt 5,
  Schritt 6) nennen, nicht nur die Dateien, die Git als Konflikt gemeldet hat. Präzedenz #11452:
  drei dokumentierte Auflösungen, vier undokumentierte Abweichungen – erst der pr-audit hat sie
  gefunden.
- **Beschriftung** auf Englisch, darunter die deutsche Zusammenfassung in einem
  `<details>`-Block (Präzedenz #8847):

  ```markdown
  ## Summary

  Internal maintenance — integrates all fixes and changes from the `release/4` branch into `develop`.

  ## Changes

  - Merged `origin/release/4` (<n> commits) into `develop`
  - Conflict resolutions: <Liste der Entscheidungen oder "none">

  <details>
  <summary>🇩🇪 Deutsche Zusammenfassung</summary>

  Interne Wartungsarbeit — alle Fixes und Änderungen aus dem `release/4`-Branch in den
  `develop`-Branch gemergt.

  </details>
  ```

- **Label:** `release:engineering` (Präzedenz-Mehrheit) – der Merge selbst ist interne Wartung ohne
  eigenes Nutzer-Versprechen; die Fixes sind bereits über die v4-Releases im Changelog. Wollen die
  Maintainer keinen Changelog-Eintrag, stattdessen `release:ignore` (Präzedenz #9182). Nie
  `release:fix` – die Fixes sind nicht neu.
- **Draft oder Ready:** direkt Ready, wenn die lokale Verifikation aus Abschnitt 5 grün ist; sonst
  Draft und nach dem Nachziehen auf Ready.
- **Merge-Verfahren:** Auto-Merge mit echtem Merge-Commit bewaffnen:

  ```bash
  gh pr merge --repo public-ui/kolibri --merge --auto
  ```

  **Niemals squash** für diesen PR: nur der Merge-Commit erhält die Ahnenlinie von `release/4`, und
  nur dann bleibt die nächste Integration inkrementell. Beide Präzedenz-PRs (#8847, #9182) sind als
  echte Merge-Commits gelandet.

- **Approval:** Der Branch-Schutz von `develop` verlangt ein Approval einer anderen Person als dem
  letzten Pusher. Der Skill stellt kein Approval und merkt keinen Merge – er bewaffnet nur Auto-Merge
  und nennt den offenen Approval-Bedarf (Review durch Maintainer, z. B. laske185).
- Fortgeführter PR: statt `gh pr create` nur pushen; PR-Beschreibung und Commit-Liste aktualisieren.

## 7. Nach dem Merge prüfen

```bash
git fetch origin --prune
git merge-base origin/develop origin/release/4
```

- Der Merge-Base muss dem Head von `origin/release/4` entsprechen – nur dann gilt der Branch als
  vollständig integriert und die nächste Integration wird leer.
- Weicht er ab, sind nach dem PR-Merge neue Commits auf `release/4` gelandet; den nächsten Lauf nach
  Abschnitt 2 fortführen.
- Lokalen Integrations-Branch und `pr-<nr>`-Hilfsbranches aufräumen.

## 8. Feste Verbote

- Kein direkter Push auf `develop` oder `release/4` – beide sind geschützt, alles läuft über den PR.
- Kein Rebase oder Force-Push des Integrations-Branch.
- Kein Squash-Merge des Integrations-PR.
- Kein Approval und kein Merge durch den Skill selbst.
- Keine lokal aktualisierten Visual-Snapshots committen.
- Keine Dateien unter `assets/` in Packages von Hand ändern; sie sind generiert.
