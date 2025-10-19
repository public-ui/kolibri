'use strict';

const Module = require('module');
const originalLoad = Module._load;

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

module.exports = {
	enzymeStub,
	enzymeToJsonStub,
};
