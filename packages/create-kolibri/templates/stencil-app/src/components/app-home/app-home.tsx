import { Component, h } from '@stencil/core';

@Component({
	tag: 'app-home',
	styleUrl: 'app-home.css',
	shadow: true,
})
export class AppHome {
	render() {
		return (
			<div class="app-home">
				<p>
					Welcome to the Stencil App Starter. You can use this starter to build entire apps all with web components using Stencil! Check out our docs on{' '}
					<a href="https://stenciljs.com">stenciljs.com</a> to get started.
				</p>

				<stencil-route-link url="/profile/stencil">
					<button>Profile page</button>
				</stencil-route-link>
				<kol-button
					_icon="fa-solid fa-smile"
					_label="Hi, welcome to KoliBri!"
					_on={{
						onClick: console.log,
					}}
					_variant="primary"
				></kol-button>
			</div>
		);
	}
}
