import { expect } from 'chai';
import { AppController } from '../../src/components/app/controller';
import { randomColor } from '../../src/shares/features';

describe(`Test: Demo-Tests`, () => {
	it('randomColor', () => {
		const color = randomColor();
		expect(color).to.eql(color);
	});

	it('AppController', () => {
		const ctrl = new AppController();
		expect(ctrl instanceof AppController).be.true;
	});
});
