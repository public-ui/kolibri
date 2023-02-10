import { waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';
import { render, screen, userEvent } from './utils/test-utils';

describe('Simple working test', () => {
	it('should do smth', async () => {
		const { container } = render(<App />);
		expect(container.querySelector('kol-button')).toBeInTheDocument();
	});
});
