import './App.css';
import { KolButton } from '@public-ui/solid';

function App() {
	return (
		<div class="App">
			<header class="App-header">
				<p>Hello Vite + React + KoliBri!</p>
				<p class="flex gap-4">
					<KolButton
						_label="Primary"
						_on=\{{
							onClick: () => {
								console.log('Clicked primary');
							},
						}}
						_variant="primary"
					/>
					<KolButton
						_label="Secondary"
						_on=\{{
							onClick: () => {
								console.log('Clicked secondary');
							},
						}}
						_variant="secondary"
					/>
					<KolButton
						_hideLabel
						_label="Danger"
						_icons="codicon codicon-trash"
						_on=\{{
							onClick: () => {
								console.log('Clicked danger');
							},
						}}
						_variant="danger"
					/>
				</p>
			</header>
		</div>
	);
}

export default App;
