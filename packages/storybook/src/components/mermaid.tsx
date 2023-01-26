import React, { FunctionComponent, useEffect } from 'react';
import mermaid from 'mermaid';
import mermaidAPI from 'mermaid/mermaidAPI';

type MermaidProps = {
	code: string;
	config?: mermaidAPI.Config;
};

let mermaidTimeout: NodeJS.Timeout;

export const mermaidLoadContent = (config?: mermaidAPI.Config) => {
	if (config) {
		mermaid.initialize(Object.assign({ startOnLoad: true }, config));
	}
	clearTimeout(mermaidTimeout);
	mermaidTimeout = setTimeout(() => {
		clearTimeout(mermaidTimeout);
		mermaid.contentLoaded();
	}, 500);
};

export const Mermaid: FunctionComponent<MermaidProps> = ({ code, config, children }) => {
	useEffect(() => {
		mermaidLoadContent(config);
	}, []);
	return (
		<div>
			<div className="mermaid">{code}</div>
		</div>
	);
};
