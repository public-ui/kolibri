import { editor, Uri, languages, Position } from 'monaco-editor';
import { Component, createEffect, createSignal, on, Show } from 'solid-js';

import { createCssEditor as createCssStyleEditor } from './css-style.editor';
import { components } from './store';

type Props = {
	propsStyle: boolean;
	tagName: string;
	theme: string;
};

languages.typescript.javascriptDefaults.setEagerModelSync(true);
languages.typescript.typescriptDefaults.setEagerModelSync(true);

const uriProps = Uri.parse(`props.css`);
const modelProps = editor.createModel('', 'css', uriProps);

const uriStyle = Uri.parse('style.css');
const modelStyle = editor.createModel('', 'css', uriStyle);

class CssProvider implements languages.CompletionItemProvider {
	public triggerCharacters?: string[] | undefined;
	public provideCompletionItems(model: editor.ITextModel, position: Position): languages.ProviderResult<languages.CompletionList> {
		const matches = model
			.getValueInRange({
				startLineNumber: 1,
				startColumn: 1,
				endLineNumber: position.lineNumber,
				endColumn: position.column,
			})
			.match(/var\((-(-[a-z0-9]+)*)*/);

		if (matches === null) {
			return {
				suggestions: [],
			};
		}

		let whiteList: string[] = [];
		whiteList = whiteList.concat(modelProps.getValue().match(/-(-[a-z0-9]+)+:/g) || []);
		whiteList.forEach((item, index) => {
			whiteList[index] = item.replace(':', '');
		});
		whiteList = [...new Set(whiteList)];
		whiteList.sort();
		// console.log('whiteList', whiteList);

		let blackList: string[] = [];
		blackList = blackList.concat(model.getValue().match(/-(-[a-z0-9]+)+:/g) || []);
		blackList = blackList.concat(model.getValue().match(/var\(-(-[a-z0-9]+)+\)/g) || []);
		blackList.forEach((item, index) => {
			blackList[index] = item.replace(':', '').replace('var(', '').replace(')', '');
		});
		blackList = [...new Set(blackList)];
		blackList.sort();
		// console.log('blackList', blackList);

		const suggestions: languages.CompletionItem[] = [];
		whiteList.forEach((property) => {
			if (blackList.includes(property) === false) {
				suggestions.push({
					insertText: property,
					label: property,
					kind: languages.CompletionItemKind.Property,
					range: {
						endColumn: position.column,
						endLineNumber: position.lineNumber,
						startColumn: position.column,
						startLineNumber: position.lineNumber,
					},
				});
			}
		});

		return {
			suggestions: suggestions,
		};
	}
}

languages.registerCompletionItemProvider('css', new CssProvider());

export const EditorComponent: Component<Props> = (props: Props) => {
	const [getShow, setShow] = createSignal<boolean>(false);
	const [getRerenderEditor, setRerenderEditor] = createSignal<boolean>(false);

	const reRender = () => {
		setShow(() => false);
		setRerenderEditor(() => false);
		const timeout = setTimeout(() => {
			clearTimeout(timeout);
			setShow(() => true);
			setRerenderEditor(() => true);
		});
	};

	createEffect(on(() => props.propsStyle, reRender));
	createEffect(on(() => props.tagName, reRender));
	createEffect(on(() => props.theme, reRender));

	const PreviewComponent = () => components[props.tagName] || <div>not prepared yet</div>;

	const renderPropsEditor = (ref: HTMLElement) => {
		createCssStyleEditor(modelProps, ref, 'GLOBAL', props.theme, setRerenderEditor);
	};
	const renderStyleEditor = (ref: HTMLElement) => {
		createCssStyleEditor(modelStyle, ref, props.tagName, props.theme, setRerenderEditor);
	};

	return (
		<div class="grid md:grid-cols-2 gap-2">
			<Show when={getShow()} fallback={<div>Loading...</div>}>
				<>
					<div class="grid h-70vh">
						<div class="overflow-hidden">
							<div
								classList={{
									'w-full h-full': props.propsStyle === false,
									'hidden ': props.propsStyle === true,
								}}
								ref={renderPropsEditor}
							></div>
							<div
								classList={{
									'w-full h-full': props.propsStyle === true,
									'hidden ': props.propsStyle === false,
								}}
								ref={renderStyleEditor}
							></div>
						</div>
					</div>
					<Show when={getRerenderEditor()} fallback={<div>Loading...</div>}>
						<div class="h-70vh">
							<div
								class="p-4 overflow-auto w-auto h-full"
								data-theme={props.theme}
								data-theme-cache="false"
								data-theme-encroach-css="before"
								// data-theme-loglevel="debug"
							>
								<PreviewComponent />
							</div>
						</div>
					</Show>
				</>
			</Show>
		</div>
	);
};
