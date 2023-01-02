import React, { FunctionComponent, useEffect } from 'react';
import mermaid from 'mermaid';

type MermaidProps = {
	code: string;
	config?: unknown;
};

let mermaidTimeout: NodeJS.Timeout;

export const mermaidLoadContent = (config) => {
	if (config) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		mermaid.initialize(Object.assign({ startOnLoad: true }, config));
	}
	clearTimeout(mermaidTimeout);
	mermaidTimeout = setTimeout(() => {
		clearTimeout(mermaidTimeout);
		mermaid.contentLoaded();
	}, 500);
};

export const Mermaid: FunctionComponent<MermaidProps> = ({ code, config }) => {
	useEffect(() => {
		mermaidLoadContent(config);
	}, []);
	return (
		<div>
			<div className="mermaid">{code}</div>
		</div>
	);
};

export default Mermaid;
