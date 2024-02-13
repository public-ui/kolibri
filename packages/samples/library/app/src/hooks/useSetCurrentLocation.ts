import { useLocation } from 'react-router';

import { setCurrentLocation } from '@public-ui/components';

export const useSetCurrentLocation = () => {
	const routerLocation = useLocation();
	setCurrentLocation('#' + routerLocation.pathname);
};
