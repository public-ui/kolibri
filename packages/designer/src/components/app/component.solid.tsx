import { Component, createEffect, createSignal, Match, Switch } from 'solid-js';

import { KolInputText, KolSelect, KolButton, KolHeading, KolAlert, KolLink, KolInputFile, KolInputCheckbox } from '@public-ui/solid';
import { EditorComponent } from '../editor/component.solid';
import { KoliBriDevHelper, SelectOption } from '@public-ui/components';
import { createTsEditor } from '../editor/ts-editor';
import AllComp from '../../assets/components-overview.svg';
import { format } from 'prettier';
import parserBabel from 'prettier/esm/parser-babel.mjs';
import { TAG_NAMES } from '../tags';
import { restoreThemes, saveData, storeThemes } from '../../shares/theme';

type Page = 'editor' | 'result' | 'overview';

const TAG_NAME_LIST: SelectOption<string>[] = [];
TAG_NAMES.forEach((tagName) => {
	TAG_NAME_LIST.push({
		label: tagName,
		value: tagName.toLocaleUpperCase(),
	});
});

export const AppComponent: Component = () => {
	const [getTheme, setTheme] = createSignal(sessionStorage.getItem('kolibri-theme') || 'default');
	const [getComponent, setComponent] = createSignal(sessionStorage.getItem('kolibri-component') || 'KOL-BUTTON');
	const [getShow, setShow] = createSignal<Page>('editor');
	const [getValue, setValue] = createSignal('');
	const [getPropsStyle, setPropsStyle] = createSignal(false);

	let select: HTMLKolSelectElement;

	createEffect(() => {
		if (select instanceof HTMLElement) {
			select._value = [getComponent()];
		}
	});

	restoreThemes();

	const renderJsonString = (theme: string): void => {
		const styles = (window.A11yUi.Themes[theme] as Record<string, string>) || {};
		const keys = Object.getOwnPropertyNames(styles);
		keys.forEach((key: string) => {
			styles[key] = styles[key].replace(/( {2,}|\n|)/g, '');
		});
		if (styles) {
			setValue(JSON.stringify(styles));
		}
	};

	const renderTsEditor = (ref: HTMLElement) => {
		createTsEditor(ref, getTheme(), getValue() || '{}');
	};

	const onClickCreate = {
		onClick: () => {
			renderJsonString(getTheme());
			setShow('result');
		},
	};

	const downloadTheme = () =>
		saveData(format(getValue(), { parser: 'json', plugins: [parserBabel] }), `kolibri-theme-${getTheme()}-${new Date().toISOString()}.json`);

	const onClickDownload = {
		onClick: () => {
			renderJsonString(getTheme());
			downloadTheme();
		},
	};

	const onChangeUpload = {
		onInput: (_event: Event, value: unknown) => {
			if (value instanceof FileList && value.item(0) instanceof File) {
				value
					.item(0)
					?.text()
					.then((content: string) => {
						KoliBriDevHelper.patchTheme(getTheme(), JSON.parse(content) as Record<string, string>);
						storeThemes();
						window.location.reload();
					})
					.catch(console.warn);
			}
		},
	};

	const onClickEdit = {
		onClick: () => {
			setShow('editor');
		},
	};

	const onClickClear = {
		onClick: () => {
			sessionStorage.removeItem('kolibri-component');
			sessionStorage.removeItem('kolibri-props');
			sessionStorage.removeItem('kolibri-theme');
			sessionStorage.removeItem('kolibri-themes');
			window.location.reload();
		},
	};

	let timeoutTheme: NodeJS.Timer;
	const onTheme = {
		onInput: (_event: Event, value: unknown) => {
			clearTimeout(timeoutTheme);
			timeoutTheme = setTimeout(() => {
				clearTimeout(timeoutTheme);
				sessionStorage.setItem('kolibri-theme', value as string);
				setTheme(value as string);
				setValue('');
				setShow('editor');
			}, 1000);
		},
	};

	const getList = (): string[] => {
		if (typeof window.A11yUi?.Themes === 'object') {
			return Object.getOwnPropertyNames(window.A11yUi.Themes);
		} else {
			return [];
		}
	};

	return (
		<div class="font-sans grid gap-2">
			<div class="grid gap-2 lg:grid-cols-3 justify-items-center items-end default">
				<div class="w-full grid gap-2 xl:grid-cols-2 justify-items-center items-end">
					<KolInputText class="w-full" _id="theme" title={getList().join(',')} _value={getTheme()} _on={onTheme} _type="search" _label={`Theme`} />
					<KolInputCheckbox
						_id="scope switch"
						_on={{
							onInput: () => {
								setPropsStyle((props) => props === false);
							},
						}}
						_checked={getPropsStyle()}
						_variant="switch"
						_label="Global-Properties / Component-Style"
					/>
				</div>
				<div class="w-full grid gap-2 md:grid-cols-2 md:col-span-2 justify-items-center items-end">
					<Switch
						fallback={
							<KolButton
								_label="Komponenten-Übersicht"
								_on={{
									onClick: (event: MouseEvent) => {
										event.preventDefault();
										setShow('overview');
									},
								}}
							></KolButton>
						}
					>
						<Match when={getShow() === 'overview'}>
							<KolButton _label="Zurück zum Theme editieren" _on={onClickEdit}></KolButton>
						</Match>
					</Switch>
					<div class="flex gap-2 items-end">
						<KolButton
							_label="Zurück"
							_icons="codicon codicon-arrow-left"
							_hideLabel
							_on={{
								onClick: (event: MouseEvent) => {
									event.preventDefault();
									const index = TAG_NAMES.indexOf(getComponent().toLowerCase());
									if (index > 0) {
										setComponent(() => TAG_NAMES[index - 1].toUpperCase());
										sessionStorage.setItem('kolibri-component', getComponent());
									}
								},
							}}
							_tooltipAlign="bottom"
						></KolButton>
						<KolSelect
							_id="component-select"
							_options={TAG_NAME_LIST}
							_on={{
								onInput: (_event, value) => {
									setComponent((value as string[])[0]);
									sessionStorage.setItem('kolibri-component', getComponent());
								},
							}}
							ref={(el: HTMLElement) => {
								select = el as HTMLKolSelectElement;
							}}
						>
							Komponenten
						</KolSelect>
						<KolButton
							_label="Weiter"
							_icons="codicon codicon-arrow-right"
							_hideLabel
							_on={{
								onClick: (event: MouseEvent) => {
									event.preventDefault();
									const index = TAG_NAMES.indexOf(getComponent().toLowerCase());
									if (index < TAG_NAMES.length - 1) {
										setComponent(() => TAG_NAMES[index + 1].toUpperCase());
										sessionStorage.setItem('kolibri-component', getComponent());
									}
								},
							}}
							_tooltipAlign="bottom"
						></KolButton>
					</div>
				</div>
			</div>
			<Switch
				fallback={
					<>
						<EditorComponent propsStyle={getPropsStyle()} tagName={getComponent()} theme={getTheme()}></EditorComponent>
						<div class="grid gap-2 default">
							<div class="mt-4">
								Drücke entweder <code class="text-lg border-1 rounded px-1">Strg + S</code> oder <code class="text-lg border-1 rounded px-1">Command + S</code>,
								um die Änderungen zu übernehmen und zu speichern.
							</div>
							<div class="flex gap-2 flex-wrap">
								<KolButton class="w-full sm:w-auto" _label="Theme erstellen" _on={onClickCreate} _variant="primary"></KolButton>
								<KolButton class="w-full sm:w-auto" _label="Theme herunterladen" _on={onClickDownload}></KolButton>
								<KolButton class="w-full sm:w-auto" _label="Alle Änderungen verwerfen" _on={onClickClear} _variant="danger"></KolButton>
							</div>
							<div class="flex gap-2">
								<KolInputFile _id="theme-upload-input" _on={onChangeUpload} _label={`Theme laden`} />
							</div>
						</div>
					</>
				}
			>
				<Match when={getShow() === 'overview'}>
					<div class="grid gap-2 default">
						<div class="w-full overflow-scroll">
							<img alt="Abhängigkeitsgraph der Komponenten" src={AllComp as unknown as string}></img>
						</div>
					</div>
				</Match>
				<Match when={getShow() === 'result'}>
					<div class="grid gap-2 p-4 default">
						<div>
							<KolHeading _label="Theming"></KolHeading>
							<KolAlert _type="info">
								Das Theming ist noch in einem experimentellen Zustand. Für Hinweise oder Verbesserungsvorschläge wenden Sie sich gerne an{' '}
								<KolLink _href="mailto:kolibri@itzbund.de" _label="kolibri@itzbund.de" _target="mail"></KolLink>
							</KolAlert>
							<p>
								Zum Gestalten der Komponenten werden sogenannte Themes verwendet. Jedes Theme beinhaltet CSS-Definitionen, die jede Komponente individuell
								stylt.
							</p>
							<KolHeading _label="Theme einbinden"></KolHeading>
							<p>
								Um ihr Theme ({getTheme()}) in ihre Anwendung einzubinden, müssen Sie einfach den Quellcode kopieren und in z.B. die <code>main.ts</code> ihrer
								Anwendung einfügen.
							</p>
						</div>
						<div>
							<KolButton _label="Zurück zum Theme editieren" _on={onClickEdit}></KolButton>
						</div>
						<div
							ref={renderTsEditor}
							style={{
								height: '500px',
								width: '100%',
							}}
						></div>
					</div>
				</Match>
			</Switch>
		</div>
	);
};
