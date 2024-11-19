import { getHeadlineTag, getSubHeadlineTag } from '../Heading';

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

	describe('getSubHeadlineTag', () => {
		it('should return "span" for level 1', () => {
			expect(getSubHeadlineTag(1)).toBe('span');
		});

		it('should return the correct headline tag for levels greater than 1', () => {
			expect(getSubHeadlineTag(2)).toBe('h2');
			expect(getSubHeadlineTag(3)).toBe('h3');
			expect(getSubHeadlineTag(6)).toBe('h6');
		});

		it('should return "strong" for invalid levels', () => {
			expect(getSubHeadlineTag(0)).toBe('strong');
			expect(getSubHeadlineTag(7)).toBe('strong');
			expect(getSubHeadlineTag(-1)).toBe('strong');
		});
	});
});
