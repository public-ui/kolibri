import { register } from '@public-ui/core';
import { ITZBund } from '@public-ui/themes';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

register(ITZBund, [])
	.then(() => {
		ReactDOM.render(
			<React.StrictMode>
				<App />
			</React.StrictMode>,
			document.getElementById('root')
		);
	})
	.catch(console.error);
