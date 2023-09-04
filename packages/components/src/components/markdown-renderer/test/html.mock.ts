export const getMarkdownRendererWcHtml = (parsedLabel: string): string => {
	return `
<kol-markdown-renderer-wc>
	<div class="md">
		${parsedLabel ?? ''}
	</div>
</kol-markdown-renderer-wc>`;
};
