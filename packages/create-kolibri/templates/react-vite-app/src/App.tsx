import './App.css';
import { KolButton } from '@public-ui/react';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<p>Hello Vite + React!</p>
				<p>
					<KolButton _label="Test" _variant="primary" />
				</p>
			</header>
		</div>
	);
}

export default App;
