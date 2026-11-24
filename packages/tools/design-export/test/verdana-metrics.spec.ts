import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import { verdanaWidth } from '../src/spec/verdana-metrics.js';

describe('verdanaWidth', () => {
	it('gives a character without an advance no width, as the browser does', () => {
		assert.equal(verdanaWidth('\u00AD\u200B\u200C\u200D\u2060\uFEFF', 16, 400), 0);
		assert.equal(verdanaWidth('\u200BButton', 16, 700), verdanaWidth('Button', 16, 700));
	});
});
