import { AfterViewChecked, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { StencilProxyComponent } from './StencilProxyComponent';

/**
 * Renders the proxy content into an element with the transformed tag name. Angular fixes the
 * selector of a component at compile time, so under a tag name transformer the proxy host keeps its
 * `kol-*` tag and the KoliBri element with the transformed tag is created inside it. The inputs bound
 * before that element exists are copied over, and the proxy points its `el` at the new element, so
 * later inputs and method calls reach it directly.
 */
@Directive({
	selector: '[replaceTag]',
})
export class ReplaceTagDirective implements AfterViewChecked {
	private tagName = '';
	private needsUpdate = false;

	public constructor(
		private readonly templateRef: TemplateRef<unknown>,
		private readonly viewContainer: ViewContainerRef,
		private readonly host: StencilProxyComponent,
	) {}

	@Input('replaceTag')
	public set tag(tagName: string) {
		this.tagName = tagName;
		this.needsUpdate = true;
		this.viewContainer.clear();
		this.viewContainer.createEmbeddedView(this.templateRef);
	}

	public ngAfterViewChecked(): void {
		if (this.needsUpdate) {
			this.needsUpdate = false;
			this.replaceTemplateElement();
		}
	}

	private replaceTemplateElement(): void {
		const anchor = this.templateRef.elementRef.nativeElement as Comment;
		const placeholder = anchor.previousElementSibling as HTMLElement | null;
		if (placeholder && anchor.parentNode) {
			const element = document.createElement(this.tagName);
			this.mirrorProperties(placeholder, element);
			Array.from(placeholder.childNodes).forEach((node) => element.appendChild(node));
			anchor.parentNode.replaceChild(element, placeholder);
			(this.host as unknown as { el: HTMLElement }).el = element;
		}
	}

	private mirrorProperties(from: HTMLElement, to: HTMLElement): void {
		for (const [key, value] of Object.entries(from)) {
			if (this.host.availableInputProperties.includes(key) && value !== undefined) {
				(to as unknown as Record<string, unknown>)[key] = value;
			}
		}
	}
}
