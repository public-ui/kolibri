/* Heavily inspired by: https://codepen.io/Mamboleoo/pen/QWEpLqm  */

export default class DetailsAnimationController {
	private animation?: Animation;
	private isClosing = false;
	private isExpanding = false;

	constructor(
		private detailsElement: HTMLDetailsElement,
		private summaryElement: HTMLElement,
		private contentElement: HTMLElement,
	) {
		this.summaryElement.addEventListener('click', this.handleSummaryClick.bind(this));
	}

	private handleSummaryClick(event: MouseEvent) {
		event.preventDefault();

		if (this.isClosing || !this.detailsElement.open) {
			this.open();
		} else if (this.isExpanding || this.detailsElement.open) {
			this.collapse();
		}
	}

	public open() {
		this.detailsElement.open = true;
		window.requestAnimationFrame(this.expand.bind(this));
	}

	private expand() {
		this.isExpanding = true;
		this.animateContentHeight('expand');
	}

	private collapse() {
		this.isClosing = true;
		this.animateContentHeight('collapse');
	}

	private animateContentHeight(direction: 'expand' | 'collapse') {
		let startHeight = direction === 'expand' ? 0 : this.contentElement.offsetHeight;
		let endHeight = direction === 'expand' ? this.contentElement.offsetHeight : 0;

		/**
		 * Override start and end height, when an animation is ongoing. During the animation, offsetHeight reflects the actual current height as it's being animated.
		 * After canceling the animation, it reverts to the full height of the content container.
		 */
		if (this.animation) {
			startHeight = this.contentElement.offsetHeight;
			this.animation.cancel();
			if (direction === 'expand') {
				endHeight = this.contentElement.offsetHeight;
			}
		}

		this.animation = this.contentElement.animate(
			{
				height: [`${startHeight}px`, `${endHeight}px`],
			},
			{
				duration: matchMedia('(prefers-reduced-motion)').matches ? 0 : 250,
				easing: 'ease-out',
			},
		);

		this.animation.addEventListener(
			'finish',
			() => {
				this.onAnimationFinish();
			},
			{ once: true },
		);
		this.animation.addEventListener(
			'cancel',
			() => {
				if (direction === 'expand') {
					this.isExpanding = false;
				} else {
					this.isClosing = false;
				}
			},
			{ once: true },
		);
	}

	private onAnimationFinish() {
		this.detailsElement.open = this.isExpanding;
		this.animation = undefined;
		this.isClosing = false;
		this.isExpanding = false;
	}
}
