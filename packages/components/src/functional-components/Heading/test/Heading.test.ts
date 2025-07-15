import { getHeadlineTag } from '../Heading';

describe('KolHeadingFc', () => {
	describe('getHeadlineTag', () => {
		it('should return the correct headline tag for valid levels', () => {
			expect(getHeadlineTag(1)).toBe('h1');
			expect(getHeadlineTag(3)).toBe('h3');
			expect(getHeadlineTag(6)).toBe('h6');
		});

		it('should return "strong" for invalid levels', () => {
			expect(getHeadlineTag(0)).toBe('strong');
			expect(getHeadlineTag(7)).toBe('strong');
			expect(getHeadlineTag(-1)).toBe('strong');
		});
	});
});
