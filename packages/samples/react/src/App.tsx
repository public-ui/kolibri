import type { FC } from 'react';
import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useSearchParams } from 'react-router';

import PackageJson from '@public-ui/components/package.json';

import { BackPage } from './components/BackPage';
import { Sidebar } from './components/Sidebar';
import { useSetCurrentLocation } from './hooks/useSetCurrentLocation';
import { useVisualBlockOutline } from './hooks/useVisualBlockOutline';
import { HideMenusContext } from './shares/HideMenusContext';
import { ROUTES } from './shares/routes';
import { sampleAppDataService } from './shares/sampleAppDataService';
import { getTheme, getThemeName, setRegisteredThemes, setStorage, setTheme } from './shares/store';
import { PUBLIC_THEMES, UNSTYLED_THEME } from './shares/theme';

import type { Route as MyRoute, Routes as MyRoutes } from './shares/types';

import type { Option } from '@public-ui/components';

import type { Theme } from './shares/theme';

setStorage(localStorage);

type Props = {
	customThemes?: Theme[];
};

export const App: FC<Props> = ({ customThemes }) => {
	const routerLocation = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();
	const hideMenus = searchParams.has('hideMenus');

	const themes = useMemo<Theme[]>(() => {
		const allThemes = [UNSTYLED_THEME, ...(customThemes && customThemes.length > 0 ? customThemes : PUBLIC_THEMES)];
		setRegisteredThemes(allThemes);
		return allThemes;
	}, [customThemes]);
	const theme: string = searchParams.get('theme') ?? getTheme();
	const [isSampleAppDataInitialized, setIsSampleAppDataInitialized] = useState(() => sampleAppDataService.isInitialized(themes));

	useEffect(() => {
		let isActive = true;
		const isInit = sampleAppDataService.isInitialized(themes);
		const updateState = (value: boolean) => {
			if (isActive) setIsSampleAppDataInitialized(value);
		};
		if (isInit) {
			setTimeout(() => updateState(true), 0);
			return;
		}
		updateState(false);
		void sampleAppDataService.initialize(themes).then(() => {
			updateState(true);
		});
		return () => {
			isActive = false;
		};
	}, [themes]);

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
									{themes.map((theme) => (
										<div className="d-grid gap-2" key={theme.key}>
											<div className="mt-4">
												<strong>{theme.name}</strong>
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

	const ROUTE_LIST = useMemo(() => getRouteList(ROUTES), []);
	const ROUTE_TREE = useMemo(() => getRouteTree(ROUTES), []);

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

	setTheme(theme); // set for `getTheme` usages within the application
	useSetCurrentLocation();
	useVisualBlockOutline();

	useEffect(() => {
		document.title = `KoliBri-Handout - ${getThemeName(getTheme())} | v${PackageJson.version}`;
		document.body.setAttribute('class', theme);
		document.body.dataset.theme = theme;
	}, [theme]);

	const handleThemeChange = (theme: unknown) => {
		setSearchParams({ theme: theme as string });
		window.location.reload();
	};

	if (!isSampleAppDataInitialized) {
		return (
			<HideMenusContext.Provider value={hideMenus}>
				<main className="flex flex-col items-stretch p-4" id="route-container">
					<p>Loading data</p>
				</main>
			</HideMenusContext.Provider>
		);
	}

	return (
		<HideMenusContext.Provider value={hideMenus}>
			<div className={!hideMenus ? 'app-container' : ''} data-theme={theme}>
				{!hideMenus && (
					<Sidebar
						version={PackageJson.version}
						themes={themes}
						theme={theme}
						sample={routerLocation.pathname}
						routes={ROUTES}
						routeList={ROUTE_LIST}
						buildDate={process.env.BUILD_DATE}
						commitHash={process.env.COMMIT_HASH}
						onThemeChange={handleThemeChange}
					/>
				)}

				<main className="flex flex-col items-stretch p-4" id="route-container">
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
