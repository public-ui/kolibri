import React from 'react';
import App from 'next/app';
import { applyPolyfills, defineCustomElements } from '@public-ui/components/dist/loader';
import { BMF } from '@public-ui/themes';
import { register } from '@public-ui/core';
import '../style.css';
import '../style.scss';

class RootApp extends App {
	componentDidMount() {
		void applyPolyfills()
			.then(() => {
				return register(BMF, []).then(() => {
					void defineCustomElements(window);
				});
			})
			.catch(console.warn);
	}

	render() {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const { Component, pageProps } = this.props;
		return (
			<>
				<Component {...pageProps} />
			</>
		);
	}
}

export default RootApp;
