const { spawn } = require('child_process');
const net = require('net');

const TEST_TIMEOUT = parseInt(process.env.TEST_TIMEOUT || '5000', 10);

let devServer;

function waitForPort(port, host = 'localhost', timeout = 10000) {
	return new Promise((resolve, reject) => {
		const start = Date.now();

		function check() {
			const socket = new net.Socket();

			socket.once('connect', () => {
				socket.end();
				resolve(true);
			});

			socket.once('error', () => {
				socket.destroy();
				if (Date.now() - start > timeout) {
					reject(new Error(`Timeout: Port ${port} not available after ${timeout}ms`));
				} else {
					setTimeout(check, 250);
				}
			});

			socket.connect(port, host);
		}

		check();
	});
}

exports.config = {
	runner: 'local',
	specs: ['./tests/**/*.webdriver.ts'],
	maxInstances: 1,
	capabilities: [
		{
			maxInstances: 1,
			browserName: 'chrome',
			'goog:chromeOptions': {
				args: ['--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--js-flags=--expose-gc'],
			},
		},
	],
	logLevel: 'silent',
	bail: 0,
	baseUrl: 'http://localhost:3000',
	waitforTimeout: TEST_TIMEOUT,
	framework: 'mocha',
	reporters: ['spec'],
	mochaOpts: {
		ui: 'bdd',
		timeout: 60000,
	},
	onPrepare: async () => {
		console.log('[wdio] Starting local dev server...');
		devServer = spawn('npx', ['serve', 'public', '-p', '3000', '--no-clipboard', '--no-request-logging'], {
			stdio: 'ignore',
			shell: true,
		});
		await waitForPort(3000).then(() => console.log('[wdio] Dev server is ready on port 3000'));
	},
	onComplete() {
		if (devServer) {
			console.log('[wdio] Stopping local dev server...');
			devServer.kill();
		}
	},
};
