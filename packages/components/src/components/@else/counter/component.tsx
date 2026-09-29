import type { JSX } from '@stencil/core';
import { h, Host, State } from '@stencil/core';

// https://webcomponents.dev/blog/all-the-ways-to-make-a-web-component/

// @Component({
// 	tag: 'kol-counter',
// 	styleUrls: {
// 		default: './style.sass',
// 	},
// 	shadow: true,
// })
export class KolCounter {
	@State() public state = {
		_count: 0,
	};

	private inc = () => {
		this.state = {
			_count: this.state._count + 1,
		};
	};

	private dec = () => {
		this.state = {
			_count: this.state._count - 1,
		};
	};

	public render(): JSX.Element {
		return (
			<Host>
				<button aria-disabled={undefined} onClick={this.dec}>
					-
				</button>
				<span>{this.state._count}</span>
				<button aria-disabled={undefined} onClick={this.inc}>
					+
				</button>
			</Host>
		);
	}
}
