import { KolLink, KolTabs } from '@public-ui/react';
import React, { FC, useState } from 'react';

type CodeSandboxProps = {
	url: string;
};

type ConfiguratorProps = {
	component: string;
	sample: string;
};

type Paths = {
	angular: string;
	react: string;
	vue: string;
	webcomponent: string;
};

type TabLabel = 'Preview' | 'Angular' | 'React' | 'Vue' | 'Web Component';
type View = 'editor' | 'preview' | '';
const mapFileInUrl = (url: string, file: string, view: View = 'editor') => `${url}&module=${file}&theme=dark&view=${view}`;

const STYLES = {
	width: '100%',
	height: '500px',
	border: '0',
	overflow: 'hidden',
};

const CodeSandbox: FC<CodeSandboxProps> = ({ url }) => (
	<>
		<iframe
			src={url}
			style={STYLES}
			title="kolibri-public-ui-react-samples"
			allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
			sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
		></iframe>
		<KolLink _href={url} _label="" _target="codesandbox">
			<img alt="CodeSandbox-Schalter" src="https://codesandbox.io/static/img/play-codesandbox.svg" />
		</KolLink>
	</>
);

export const Configurator: FC<ConfiguratorProps> = ({ component, sample }) => {
	const [tab, setTab] = useState<TabLabel>('React');
	const baseUrl = `https://codesandbox.io/embed/kolibri-public-ui-react-samples-w5u37c?fontsize=14&hidenavigation=1`;
	const path = `%2Fsrc%2Fsamples%2F${component}%2F${sample}`;
	const files: Paths = {
		angular: `${path}.html`,
		react: `${path}.tsx`,
		vue: `${path}.vue`,
		webcomponent: `${path}.html`,
	};

	const onSelect = {
		onSelect: (_event, idx) => {
			switch (idx) {
				case 1:
					setTab('Angular');
					break;
				case 2:
					setTab('React');
					break;
				case 3:
					setTab('Vue');
					break;
				case 4:
					setTab('Web Component');
					break;
				default:
					setTab('Preview');
			}
		},
	};

	return (
		<KolTabs
			_ariaLabel="Code-Beispiel"
			_on={onSelect}
			_selected={2}
			_tabs={[
				{
					_disabled: true,
					_label: 'Vorschau',
				},
				{
					_disabled: true,
					_label: 'Angular',
				},
				{
					_label: 'React',
				},
				{
					_disabled: true,
					_label: 'Vue',
				},
				{
					_label: 'Web Component',
				},
			]}
		>
			<div>{tab === 'Preview' && <CodeSandbox url={mapFileInUrl(baseUrl, files.react, 'preview')} />}</div>
			<div>{tab === 'Angular' && <CodeSandbox url={mapFileInUrl(baseUrl, files.angular)} />}</div>
			<div>{tab === 'React' && <CodeSandbox url={mapFileInUrl(baseUrl, files.react)} />}</div>
			<div>{tab === 'Vue' && <CodeSandbox url={mapFileInUrl(baseUrl, files.vue)} />}</div>
			<div>{tab === 'Web Component' && <CodeSandbox url={mapFileInUrl(baseUrl, files.webcomponent)} />}</div>
		</KolTabs>
	);
};
