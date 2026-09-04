/**
 * Aktualisiert Theme-Snapshots lokal im selben Playwright-Container wie die CI.
 *
 * Hintergrund: `snapshotPathTemplate` in packages/tools/visual-tests/playwright.config.js enthält
 * `{platform}`, und das Font-Rendering hängt am Betriebssystem. Snapshots, die auf Windows entstehen,
 * sind für die CI daher wertlos. Dieses Skript spiegelt den Workspace in ein Docker-Volume,
 * installiert und baut dort und schreibt nur die erzeugten Snapshots ins Repo zurück – die
 * node_modules des Hosts bleiben unangetastet.
 *
 *   node scripts/snapshots-docker.mjs default                    # ein Theme aktualisieren
 *   node scripts/snapshots-docker.mjs default kern               # mehrere Themes
 *   node scripts/snapshots-docker.mjs --all                      # alle Themes (wie die CI)
 *   node scripts/snapshots-docker.mjs default --check            # nur prüfen, nichts schreiben
 *   node scripts/snapshots-docker.mjs default -- --grep Button   # Args an Playwright durchreichen
 *   node scripts/snapshots-docker.mjs --shell                    # interaktive Shell im Container
 *   node scripts/snapshots-docker.mjs --reset                    # Volume verwerfen (Neuinstallation)
 */
import { spawnSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const VOLUME = 'kolibri-visual-tests-work';
const CONTAINER_WORKSPACE = '/work/repo';
const KNOWN_FLAGS = ['--all', '--shell', '--reset', '--no-purge', '--check'];

/* Nicht spiegeln: plattformabhängig, sehr groß oder im Container ohnehin neu erzeugt. */
const SYNC_EXCLUDES = ['node_modules', '.git', 'dist', 'test-results', 'playwright-report', '.turbo', '.vscode', 'license-reports'];

/** Themepakete als { name, dir, pkg }: `dir` ist der Pfad im Repo, `pkg` der pnpm-Filter-Name. */
function discoverThemes() {
	const themes = [];
	for (const dir of ['packages/themes', 'packages']) {
		const root = path.join(REPO_ROOT, dir);
		if (!fs.existsSync(root)) continue;
		for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
			/* Unter packages/themes ist jedes Verzeichnis ein Theme; unter packages nur `unstyled`
			   (Theme ohne Theme-CSS, liegt absichtlich außerhalb von packages/themes). */
			const isTheme = dir === 'packages/themes' ? entry.isDirectory() : entry.name === 'unstyled' && entry.isDirectory();
			const pkgJsonPath = path.join(root, entry.name, 'package.json');
			if (isTheme && fs.existsSync(pkgJsonPath)) {
				themes.push({
					name: entry.name,
					dir: `${dir}/${entry.name}`,
					pkg: JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8')).name,
				});
			}
		}
	}
	return themes.sort((a, b) => a.name.localeCompare(b.name));
}

const ALL_THEMES = discoverThemes();
const THEME_NAMES = ALL_THEMES.map((theme) => theme.name);

/** Image-Tag aus der Playwright-Version ableiten, damit lokal und CI nie auseinanderlaufen. */
function resolveImage() {
	const pkg = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'packages/tools/visual-tests/package.json'), 'utf8'));
	const version = pkg.peerDependencies?.['@playwright/test'];
	if (!version || !/^\d+\.\d+\.\d+$/.test(version)) {
		throw new Error(`Playwright-Version aus @public-ui/visual-tests nicht lesbar (erhalten: ${version}).`);
	}
	return `mcr.microsoft.com/playwright:v${version}-noble`;
}

function docker(args, { interactive = false } = {}) {
	const result = spawnSync('docker', args, { stdio: 'inherit', shell: false, windowsHide: !interactive });
	if (result.error) throw result.error;
	return result.status ?? 1;
}

function dockerQuiet(args) {
	return spawnSync('docker', args, { encoding: 'utf8', shell: false, windowsHide: true });
}

function shellQuote(value) {
	return `'${value.split("'").join(`'\\''`)}'`;
}

function parseArgs(argv) {
	const separator = argv.indexOf('--');
	const own = separator === -1 ? argv : argv.slice(0, separator);
	const playwrightArgs = separator === -1 ? [] : argv.slice(separator + 1);

	const flags = new Set(own.filter((arg) => arg.startsWith('--')));
	const themes = own.filter((arg) => !arg.startsWith('--'));

	for (const flag of flags) {
		if (!KNOWN_FLAGS.includes(flag)) throw new Error(`Unbekannte Option: ${flag}. Erlaubt: ${KNOWN_FLAGS.join(', ')}`);
	}
	for (const theme of themes) {
		if (!THEME_NAMES.includes(theme)) throw new Error(`Unbekanntes Theme "${theme}". Verfügbar: ${THEME_NAMES.join(', ')}`);
	}

	return {
		themes: flags.has('--all') ? ALL_THEMES : ALL_THEMES.filter((theme) => themes.includes(theme.name)),
		all: flags.has('--all'),
		shell: flags.has('--shell'),
		reset: flags.has('--reset'),
		purge: !flags.has('--no-purge'),
		check: flags.has('--check'),
		playwrightArgs,
	};
}

/** Bash-Skript, das im Container ausgeführt wird. */
function buildScript({ themes, all, purge, check, playwrightArgs }) {
	const excludes = SYNC_EXCLUDES.map((name) => `--exclude=${name}`).join(' ');
	const extra = playwrightArgs.map((arg) => ` ${shellQuote(arg)}`).join('');
	const task = check ? 'test' : 'test:update:e2e';
	/* Der `--all`-Lauf ist die Pre-Push-Abnahme — dort auf 1 Worker gehen (maximale
	   Snapshot-Stabilität), sofern der Aufrufer nichts anderes vorgibt. Einzel-/Cluster-Läufe
	   für die Fix-Iteration bleiben bei den 4 Default-Workern der Playwright-Config. */
	const workersEnv = all && !process.env.KOLIBRI_VISUAL_TESTS_WORKERS ? 'export KOLIBRI_VISUAL_TESTS_WORKERS=1' : '';

	const perTheme = themes
		.map(
			({ name, dir, pkg }) => `
echo "==> Theme ${name}: ${task}"
${purge && !check ? `find ${dir} -name '*.png' -path '*/snapshots/*' -not -path '*/node_modules/*' -delete` : ''}
pnpm --filter ${pkg} ${task}${extra}
`,
		)
		.join('');

	return `
set -euo pipefail

export HOME=/work/home
export PATH="/work/npm-global/bin:$PATH"
export CI=0                       # keine Retries + parallele Workers — für schnelle lokale Entwicklung
${workersEnv}
mkdir -p "$HOME" "${CONTAINER_WORKSPACE}"

if ! command -v pnpm >/dev/null 2>&1; then
  echo "==> pnpm im Volume installieren (einmalig)"
  npm install -g --prefix /work/npm-global pnpm@10 >/dev/null
fi

echo "==> Workspace /src -> ${CONTAINER_WORKSPACE} spiegeln"
node /src/scripts/mirror-dir.mjs /src "${CONTAINER_WORKSPACE}" ${excludes}

cd "${CONTAINER_WORKSPACE}"
# Das .git-Verzeichnis wird nicht gespiegelt (mehrere GB), der prepare-Hook "lefthook install"
# braucht aber ein Repository.
[ -d .git ] || git init -q
git config --global --add safe.directory "${CONTAINER_WORKSPACE}"

echo "==> pnpm install"
pnpm install --frozen-lockfile

echo "==> Abhängigkeiten der Visual-Tests bauen"
pnpm --filter @public-ui/visual-tests^... build
${perTheme}
echo "==> Testlauf beendet"
`;
}

/**
 * Bash-Skript für das Zurückschreiben der Snapshots ins Repo. Läuft in einem eigenen Container,
 * weil uid 1001 im Bind-Mount des Hosts nicht zwingend schreiben darf.
 */
function buildWriteBackScript(themes) {
	return themes
		.map(
			({ name, dir }) => `
echo "==> Snapshots von ${name} ins Repo zurückschreiben"
node /src/scripts/mirror-dir.mjs "${CONTAINER_WORKSPACE}/${dir}/snapshots" "/src/${dir}/snapshots"
`,
		)
		.join('');
}

function main() {
	const options = parseArgs(process.argv.slice(2));

	if (dockerQuiet(['version', '--format', '{{.Server.Version}}']).status !== 0) {
		console.error('Docker ist nicht erreichbar. Bitte Docker Desktop starten.');
		process.exit(1);
	}

	if (options.reset) {
		console.log(`==> Volume ${VOLUME} entfernen`);
		docker(['volume', 'rm', '-f', VOLUME]);
	}
	if (!options.shell && options.themes.length === 0) {
		if (options.reset) return;
		options.themes = ALL_THEMES.filter((theme) => theme.name === 'default');
	}

	const image = resolveImage();
	console.log(`==> Image: ${image}`);

	if (dockerQuiet(['image', 'inspect', image]).status !== 0) {
		console.log('==> Image wird geladen (einmalig, ca. 3,4 GB) …');
		if (docker(['pull', image]) !== 0) process.exit(1);
	}

	/* Das Named Volume gehört initial root; der Testlauf selbst muss als pwuser (uid 1001) laufen,
	   weil Firefox sich weigert, als root zu starten (siehe update-snapshots.yml). Deshalb einmal
	   als root die Verzeichnisstruktur anlegen und übereignen. */
	const bootstrap = docker([
		'run',
		'--rm',
		'--user',
		'0',
		'-v',
		`${VOLUME}:/work`,
		image,
		'bash',
		'-c',
		`mkdir -p /work/home /work/npm-global ${CONTAINER_WORKSPACE} && chown 1001:1001 /work /work/home /work/npm-global ${CONTAINER_WORKSPACE}`,
	]);
	if (bootstrap !== 0) {
		console.error(`Volume ${VOLUME} konnte nicht vorbereitet werden.`);
		process.exit(bootstrap);
	}

	/* Kein -w: Docker würde ein fehlendes Arbeitsverzeichnis als root anlegen. Das Container-Skript
	   wechselt selbst dorthin. */
	const runArgs = (user) => ['run', '--rm', '--user', user, '-v', `${REPO_ROOT.split('\\').join('/')}:/src`, '-v', `${VOLUME}:/work`, '-w', '/work'];

	if (options.shell) {
		console.log(`==> Interaktive Shell. Workspace: ${CONTAINER_WORKSPACE}, Repo-Mount: /src`);
		process.exit(docker([...runArgs('1001'), '-it', image, 'bash'], { interactive: true }));
	}

	console.log(`==> Themes: ${options.themes.map((theme) => theme.name).join(', ')}${options.check ? ' (nur prüfen)' : ''}`);
	const status = docker([...runArgs('1001'), image, 'bash', '-c', buildScript(options)]);

	if (options.check) {
		console.log('==> --check: es wird nichts ins Repo zurückgeschrieben');
		process.exit(status);
	}
	if (status !== 0) {
		console.error('==> Testlauf fehlgeschlagen – es wird nichts ins Repo zurückgeschrieben.');
		console.error(`==> Ergebnisse im Volume ansehen: node scripts/snapshots-docker.mjs --shell`);
		process.exit(status);
	}

	/* Auf Windows-Bind-Mounts gibt es keine echte Ownership, dort ist root die sichere Wahl.
	   Unter Linux/macOS werden die Dateien dem aufrufenden Benutzer übereignet. */
	const writeBackUser = typeof process.getuid === 'function' ? `${process.getuid()}:${process.getgid()}` : '0';

	process.exit(docker([...runArgs(writeBackUser), image, 'bash', '-c', buildWriteBackScript(options.themes)]));
}

try {
	main();
} catch (error) {
	console.error(error.message);
	process.exit(1);
}
