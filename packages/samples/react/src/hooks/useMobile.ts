import { useEffect, useState } from 'react';

export function useMobile(): boolean {
	const mediaQuery = matchMedia('(max-width: 1023px)');
	const [matches, setMatches] = useState<boolean>(mediaQuery.matches);

	const handleChange = () => {
		setMatches(mediaQuery.matches);
	};

	useEffect(() => {
		handleChange(); // handle initial value
		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	}, [mediaQuery]);

	return matches;
}
