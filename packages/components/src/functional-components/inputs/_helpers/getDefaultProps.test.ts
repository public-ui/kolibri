import { getDefaultProps } from './getDefaultProps';

describe('getDefaultProps', () => {
	it('should return default props when no arguments are provided', () => {
		const result = getDefaultProps({});
		expect(result).toEqual({
			title: '',
			autoCapitalize: 'off',
			autoCorrect: 'off',
			'aria-describedby': undefined,
			'aria-label': undefined,
		});
	});

	it('should set aria-describedby when ariaDescribedBy is provided', () => {
		const result = getDefaultProps({ ariaDescribedBy: ['id1', 'id2'] });
		expect(result['aria-describedby']).toBe('id1 id2');
	});

	it('should not set aria-describedby when ariaDescribedBy is an empty array', () => {
		const result = getDefaultProps({ ariaDescribedBy: [] });
		expect(result['aria-describedby']).toBeUndefined();
	});

	it('should set aria-label when hideLabel is true and label is provided', () => {
		const result = getDefaultProps({ hideLabel: true, label: 'Test Label' });
		expect(result['aria-label']).toBe('Test Label');
	});

	it('should not set aria-label when hideLabel is false', () => {
		const result = getDefaultProps({ hideLabel: false, label: 'Test Label' });
		expect(result['aria-label']).toBeUndefined();
	});

	it('should not set aria-label when label is not provided', () => {
		const result = getDefaultProps({ hideLabel: true });
		expect(result['aria-label']).toBeUndefined();
	});
});
