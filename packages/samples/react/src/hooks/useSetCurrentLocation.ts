import { setCurrentLocation } from '@public-ui/components';
import { useLocation } from 'react-router';

export const useSetCurrentLocation = () => {
	const routerLocation = useLocation();
	setCurrentLocation('#' + routerLocation.pathname);
};
