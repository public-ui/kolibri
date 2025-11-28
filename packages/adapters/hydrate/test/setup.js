'use strict';

const Module = require('module');
const { trackHandles, restoreHandles } = require('./simple-handles');

const originalLoad = Module._load;

// Stub enzyme for compatibility
const enzymeStub = {
	ShallowWrapper: class {},
	ReactWrapper: class {},
};

const enzymeToJsonStub = (value) => value;

Module._load = function (request, parent, isMain) {
	if (request === 'enzyme') {
		return enzymeStub;
	}
	if (request === 'enzyme-to-json') {
		return {
			default: enzymeToJsonStub,
		};
	}
	return originalLoad.apply(this, arguments);
};

// Track handles for clean test execution
const handleTracker = trackHandles();

// Set up clean exit handling
process.on('exit', () => {
	handleTracker.clearAllTimers();
	handleTracker.restore();
});

process.on('SIGINT', () => {
	handleTracker.clearAllTimers();
	handleTracker.restore();
	process.exit(0);
});

process.on('SIGTERM', () => {
	handleTracker.clearAllTimers();
	handleTracker.restore();
	process.exit(0);
});

module.exports = {
	enzymeStub,
	enzymeToJsonStub,
	handleTracker,
};
