import type { FC } from 'react';
import React from 'react';
import { useLocation } from 'react-router';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';

import PackageJson from '@public-ui/components/package.json';
import { KolBadge } from '@public-ui/react';

import { BackPage } from './components/BackPage';
import { Sidebar } from './components/Sidebar';
import { useSetCurrentLocation } from './hooks/useSetCurrentLocation';
import { HideMenusContext } from './shares/HideMenusContext';
import { ROUTES } from './shares/routes';
import { getTheme, getThemeName, setStorage, setTheme } from './shares/store';
import { THEMES, THEME_OPTIONS, isDraftTheme } from './shares/theme';

import type { Route as MyRoute, Routes as MyRoutes } from './shares/types';

import type { Option } from '@public-ui/components';
import type { Theme, ThemeAndUnstyled } from './shares/theme';

setStorage(localStorage);

const getRouteList = (routes: MyRoutes, offset = '/'): string[] => {
	let list: string[] = [];
	for (const key in routes) {
		if (routes[key]) {
			const ThisRoute: MyRoute = routes[key];
			const path = `${offset}${key}`;
			if (typeof ThisRoute === 'function') {
				list.push(path);
			} else if (typeof ThisRoute === 'object' && ThisRoute !== null) {
				list = list.concat(getRouteList(ThisRoute, `${path}/`));
			}
		}
	}
	return list;
};

const getRouteTree = (routes: MyRoutes): ReturnType<typeof Route>[] => {
	const tree: ReturnType<typeof Route>[] = [];
	for (const key in routes) {
		if (routes[key]) {
			const ThisRoute: MyRoute = routes[key];
			const path = `/${key}`;
			if (typeof ThisRoute === 'function') {
				tree.push(<Route key={path} path={path} element={<ThisRoute />} />);
				tree.push(
					<Route
						key={`${path}/all`}
						path={`${path}/all`}
						element={
							<div className="d-grid gap-4">
								{THEME_OPTIONS.filter((theme) => THEMES.indexOf((theme as Option<Theme>).value) >= 0).map((theme) => (
									<div className="d-grid gap-2" key={(theme as Option<ThemeAndUnstyled>).value} data-theme={(theme as Option<ThemeAndUnstyled>).value}>
										<div className="mt-4">
											<strong>{theme.label}</strong>
										</div>
										<div className="my-2">
											<ThisRoute />
										</div>
										<hr aria-hidden="true" />
									</div>
								))}
							</div>
						}
					/>,
				);
			} else if (typeof ThisRoute === 'object' && ThisRoute !== null) {
				const keys = Object.keys(ThisRoute);
				if (keys.length > 0) {
					tree.push(
						<Route
							key={path}
							path={`${path}/*`}
							element={
								<Routes>
									<Route path="/" element={<Navigate to={keys[0]} />} />
									{getRouteTree(ThisRoute)}
								</Routes>
							}
						/>,
					);
				}
			}
		}
	}
	return tree;
};

const ROUTE_LIST = getRouteList(ROUTES);
const ROUTE_TREE = getRouteTree(ROUTES);

console.log('ROUTE_LIST', ROUTE_LIST);

const componentList: Map<string, Option<string>> = new Map();
ROUTE_LIST.forEach((route) => {
	const routeSplit = route.split('/');
	if (!componentList.has(routeSplit[1])) {
		componentList.set(routeSplit[1], {
			label: routeSplit[1],
			value: route,
		});
	}
});

export const App: FC = () => {
	const routerLocation = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();
	const theme: ThemeAndUnstyled = (searchParams.get('theme') as ThemeAndUnstyled) ?? getTheme();
	const hideMenus = searchParams.has('hideMenus');

	setTheme(theme); // set for `getTheme` usages within the application
	useSetCurrentLocation();

	document.title = `KoliBri-Handout - ${getThemeName(getTheme())} | v${PackageJson.version}`;
	document.body.setAttribute('class', theme);
	document.body.dataset.theme = theme;

	const handleThemeChange = (theme: unknown) => {
		setSearchParams({ theme: theme as string });
		window.location.reload();
	};

	return (
		<HideMenusContext.Provider value={hideMenus}>
			<div className={!hideMenus ? 'app-container' : ''} data-theme={theme}>
				{!hideMenus && (
					<Sidebar
						version={PackageJson.version}
						theme={theme}
						sample={routerLocation.pathname}
						routes={ROUTES}
						routeList={ROUTE_LIST}
						buildDate={process.env.BUILD_DATE}
						commitHash={process.env.COMMIT_HASH}
						onThemeChange={handleThemeChange}
					/>
				)}

				<main className="flex flex-col items-start p-4" id="route-container">
					{!hideMenus && isDraftTheme(theme) && <KolBadge className="block mb-3" _label="DRAFT" _color="#db5461" />}
					<Routes>
						{ROUTE_TREE}
						<Route path="*" element={<Navigate to={ROUTE_LIST[0]} replace />} />
						<Route path="back-page" element={<BackPage />} />
					</Routes>
				</main>
			</div>
		</HideMenusContext.Provider>
	);
};
