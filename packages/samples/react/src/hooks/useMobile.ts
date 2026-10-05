import { useEffect, useState } from 'react';

export function useMobile(): boolean {
	const mediaQuery = matchMedia('(max-width: 1023px)');
	const [matches, setMatches] = useState<boolean>(mediaQuery.matches);

	useEffect(() => {
		const handleChange = (e: MediaQueryListEvent) => {
			setMatches(e.matches);
		};
		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	}, [mediaQuery]);

	return matches;
}
