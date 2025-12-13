import { getRenderStates } from './controller';

describe('getRenderStates', () => {
	describe('msg-type: undefiniert', () => {
		it('touched: undefined → aria-describedby: -', () => {
			const { ariaDescribedBy } = getRenderStates({
				_id: 'field',
				_touched: undefined,
			});

			expect(ariaDescribedBy).toEqual([]);
		});

		it('touched: true → aria-describedby: -', () => {
			const { ariaDescribedBy } = getRenderStates({
				_id: 'field',
				_touched: true,
			});

			expect(ariaDescribedBy).toEqual([]);
		});

		it('touched: false → aria-describedby: -', () => {
			const { ariaDescribedBy } = getRenderStates({
				_id: 'field',
				_touched: false,
			});

			expect(ariaDescribedBy).toEqual([]);
		});
	});

	describe('msg-type: error', () => {
		it('touched: undefined → aria-describedby: -', () => {
			const { ariaDescribedBy, hasError } = getRenderStates({
				_id: 'field',
				_msg: { _description: 'Fehler', _type: 'error' },
				_touched: undefined,
			});

			expect(hasError).toBe(false);
			expect(ariaDescribedBy).toEqual([]);
		});

		it('touched: true → aria-describedby: id-error', () => {
			const { ariaDescribedBy, hasError } = getRenderStates({
				_id: 'field',
				_msg: { _description: 'Fehler', _type: 'error' },
				_touched: true,
			});

			expect(hasError).toBe(true);
			expect(ariaDescribedBy).toEqual(['field-error']);
		});

		it('touched: false → aria-describedby: -', () => {
			const { ariaDescribedBy, hasError } = getRenderStates({
				_id: 'field',
				_msg: { _description: 'Fehler', _type: 'error' },
				_touched: false,
			});

			expect(hasError).toBe(false);
			expect(ariaDescribedBy).toEqual([]);
		});
	});

	describe('msg-type: info', () => {
		it('touched: undefined → aria-describedby: id-error', () => {
			const { ariaDescribedBy, hasError } = getRenderStates({
				_id: 'field',
				_msg: { _description: 'Info', _type: 'info' },
				_touched: undefined,
			});

			expect(hasError).toBe(false);
			expect(ariaDescribedBy).toEqual(['field-error']);
		});

		it('touched: true → aria-describedby: id-error', () => {
			const { ariaDescribedBy, hasError } = getRenderStates({
				_id: 'field',
				_msg: { _description: 'Info', _type: 'info' },
				_touched: true,
			});

			expect(hasError).toBe(false);
			expect(ariaDescribedBy).toEqual(['field-error']);
		});

		it('touched: false → aria-describedby: id-error', () => {
			const { ariaDescribedBy, hasError } = getRenderStates({
				_id: 'field',
				_msg: { _description: 'Info', _type: 'info' },
				_touched: false,
			});

			expect(hasError).toBe(false);
			expect(ariaDescribedBy).toEqual(['field-error']);
		});
	});

	describe('msg-type: default', () => {
		it('touched: undefined → aria-describedby: id-error', () => {
			const { ariaDescribedBy, hasError } = getRenderStates({
				_id: 'field',
				_msg: { _description: 'Hinweis' },
				_touched: undefined,
			});

			expect(hasError).toBe(false);
			expect(ariaDescribedBy).toEqual(['field-error']);
		});

		it('touched: true → aria-describedby: id-error', () => {
			const { ariaDescribedBy, hasError } = getRenderStates({
				_id: 'field',
				_msg: { _description: 'Hinweis' },
				_touched: true,
			});

			expect(hasError).toBe(false);
			expect(ariaDescribedBy).toEqual(['field-error']);
		});

		it('touched: false → aria-describedby: id-error', () => {
			const { ariaDescribedBy, hasError } = getRenderStates({
				_id: 'field',
				_msg: { _description: 'Hinweis' },
				_touched: false,
			});

			expect(hasError).toBe(false);
			expect(ariaDescribedBy).toEqual(['field-error']);
		});
	});

	describe('msg-type: success', () => {
		it('touched: undefined → aria-describedby: id-error', () => {
			const { ariaDescribedBy, hasError } = getRenderStates({
				_id: 'field',
				_msg: { _description: 'Erfolg', _type: 'success' },
				_touched: undefined,
			});

			expect(hasError).toBe(false);
			expect(ariaDescribedBy).toEqual(['field-error']);
		});

		it('touched: true → aria-describedby: id-error', () => {
			const { ariaDescribedBy, hasError } = getRenderStates({
				_id: 'field',
				_msg: { _description: 'Erfolg', _type: 'success' },
				_touched: true,
			});

			expect(hasError).toBe(false);
			expect(ariaDescribedBy).toEqual(['field-error']);
		});

		it('touched: false → aria-describedby: id-error', () => {
			const { ariaDescribedBy, hasError } = getRenderStates({
				_id: 'field',
				_msg: { _description: 'Erfolg', _type: 'success' },
				_touched: false,
			});

			expect(hasError).toBe(false);
			expect(ariaDescribedBy).toEqual(['field-error']);
		});
	});

	describe('msg-type: warning', () => {
		it('touched: undefined → aria-describedby: id-error', () => {
			const { ariaDescribedBy, hasError } = getRenderStates({
				_id: 'field',
				_msg: { _description: 'Warnung', _type: 'warning' },
				_touched: undefined,
			});

			expect(hasError).toBe(false);
			expect(ariaDescribedBy).toEqual(['field-error']);
		});

		it('touched: true → aria-describedby: id-error', () => {
			const { ariaDescribedBy, hasError } = getRenderStates({
				_id: 'field',
				_msg: { _description: 'Warnung', _type: 'warning' },
				_touched: true,
			});

			expect(hasError).toBe(false);
			expect(ariaDescribedBy).toEqual(['field-error']);
		});

		it('touched: false → aria-describedby: id-error', () => {
			const { ariaDescribedBy, hasError } = getRenderStates({
				_id: 'field',
				_msg: { _description: 'Warnung', _type: 'warning' },
				_touched: false,
			});

			expect(hasError).toBe(false);
			expect(ariaDescribedBy).toEqual(['field-error']);
		});
	});
});
