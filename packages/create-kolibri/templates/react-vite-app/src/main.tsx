import { register } from '@public-ui/components';
import { BMF } from '@public-ui/themes';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

register(BMF, [])
	.then(() => {
		ReactDOM.render(
			<React.StrictMode>
				<App />
			</React.StrictMode>,
			document.getElementById('app')
		);
	})
	.catch(console.error);
