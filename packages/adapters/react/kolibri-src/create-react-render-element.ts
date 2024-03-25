/**
 * Creates a host react for rendering React components, that won't be announced as clickable by screen readers, as React roots normally would.
 */
export function createReactRenderElement(hostElement: HTMLElement): HTMLDivElement {
	const renderElement = document.createElement('div');
	renderElement.setAttribute('role', 'presentation');
	hostElement.innerHTML = '';
	hostElement.appendChild(renderElement);

	return renderElement;
}
