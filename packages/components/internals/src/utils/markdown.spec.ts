import { describe, expect, it } from '@jest/globals';

import { md } from './markdown';

describe('the inline markdown rendering of a label', () => {
	it('renders plain text unchanged', () => {
		expect(md('A plain label')).toBe('A plain label');
	});

	it('renders an empty label as an empty string', () => {
		expect(md('')).toBe('');
	});

	it('renders bold with asterisks and with underscores', () => {
		expect(md('**Bold**')).toBe('<strong>Bold</strong>');
		expect(md('__Bold__')).toBe('<strong>Bold</strong>');
		expect(md('**Te**xt')).toBe('<strong>Te</strong>xt');
	});

	it('renders italic with asterisks and with underscores', () => {
		expect(md('*Italic*')).toBe('<em>Italic</em>');
		expect(md('_Italic_')).toBe('<em>Italic</em>');
	});

	it('renders strikethrough', () => {
		expect(md('~~Struck~~')).toBe('<s>Struck</s>');
	});

	it('renders inline code', () => {
		expect(md('`y = mx + n`')).toBe('<code>y = mx + n</code>');
	});

	it('renders a hard line break for at least two spaces before the line break and keeps a single line break as text', () => {
		expect(md('line one  \nline two')).toBe('line one<br>\nline two');
		expect(md('line one\nline two')).toBe('line one\nline two');
	});

	it('normalizes carriage returns before rendering the line breaks', () => {
		expect(md('line one  \r\nline two')).toBe('line one<br>\nline two');
		expect(md('line one\r\nline two')).toBe('line one\nline two');
	});

	it('renders every documented syntax in one label', () => {
		expect(md('**Bold** and _italic_ Markdown label')).toBe('<strong>Bold</strong> and <em>italic</em> Markdown label');
		expect(md('This is ~~strikethrough~~ text')).toBe('This is <s>strikethrough</s> text');
		expect(md('Source code like `y = mx + n` is possible')).toBe('Source code like <code>y = mx + n</code> is possible');
	});

	it('combines the inline elements with each other', () => {
		expect(md('~~**struck bold**~~')).toBe('<s><strong>struck bold</strong></s>');
		expect(md('***Bold italic***')).toBe('<em><strong>Bold italic</strong></em>');
		expect(md('___Bold italic___')).toBe('<em><strong>Bold italic</strong></em>');
		expect(md('**bold and *italic* text**')).toBe('<strong>bold and <em>italic</em> text</strong>');
	});

	it('renders bold and italic next to punctuation', () => {
		expect(md('(_Italic_)')).toBe('(<em>Italic</em>)');
		expect(md('"**Bold**"')).toBe('&quot;<strong>Bold</strong>&quot;');
	});

	it('keeps emphasis inside a word literal for underscores and renders it for asterisks', () => {
		expect(md('some_file_name')).toBe('some_file_name');
		expect(md('foo__bar__baz')).toBe('foo__bar__baz');
		expect(md('Müller_Weg')).toBe('Müller_Weg');
		expect(md('foo*bar*baz')).toBe('foo<em>bar</em>baz');
	});

	it('keeps labels without a paired marker literal', () => {
		expect(md('*Italic')).toBe('*Italic');
		expect(md('**Bold')).toBe('**Bold');
		expect(md('~~Struck')).toBe('~~Struck');
		expect(md('`Code')).toBe('`Code');
		expect(md('``')).toBe('``');
	});

	it('keeps bold and italic with inner spaces literal', () => {
		expect(md('** Bold **')).toBe('** Bold **');
		expect(md('* Italic *')).toBe('* Italic *');
	});

	it('closes a run of underscores like CommonMark at the last possible delimiter', () => {
		expect(md('__a__b__')).toBe('<strong>a__b</strong>');
	});

	it('keeps inline code unformatted and protects its content from the other syntax', () => {
		expect(md('`**not bold**`')).toBe('<code>**not bold**</code>');
		expect(md('`a * b`')).toBe('<code>a * b</code>');
	});

	it('keeps block syntax literal', () => {
		expect(md('# Heading')).toBe('# Heading');
		expect(md('- item')).toBe('- item');
		expect(md('> quote')).toBe('&gt; quote');
	});

	it('keeps links and images literal', () => {
		expect(md('[Link](https://example.com)')).toBe('[Link](https://example.com)');
		expect(md('![Alt](image.png)')).toBe('![Alt](image.png)');
		expect(md('<https://example.com>')).toBe('&lt;https://example.com&gt;');
	});

	it('renders a backslash before a syntax marker as text', () => {
		expect(md('\\*not italic\\*')).toBe('*not italic*');
		expect(md('\\`not code\\`')).toBe('`not code`');
		expect(md('C:\\\\path')).toBe('C:\\path');
	});

	it('replaces the null character with the replacement character', () => {
		expect(md(`a${String.fromCharCode(0)}b`)).toBe(`a${String.fromCharCode(65533)}b`);
	});

	it('resolves numeric and the most common named character references and keeps every other reference as text', () => {
		expect(md('&#65;&#x42;')).toBe('AB');
		expect(md('A &amp; B')).toBe('A &amp; B');
		expect(md('A &lt; B')).toBe('A &lt; B');
		expect(md('&nbsp;')).toBe(String.fromCharCode(160));
		expect(md('&uuml;')).toBe('&amp;uuml;');
		expect(md('AT & T')).toBe('AT &amp; T');
	});

	it('escapes raw HTML so it stays visible text', () => {
		expect(md('<script>alert(1)</script>')).toBe('&lt;script&gt;alert(1)&lt;/script&gt;');
		expect(md('<img src=x onerror=alert(1)>')).toBe('&lt;img src=x onerror=alert(1)&gt;');
		expect(md('3 < 5 & 12 > 2')).toBe('3 &lt; 5 &amp; 12 &gt; 2');
		expect(md('"quoted"')).toBe('&quot;quoted&quot;');
	});

	it('escapes raw HTML inside the formatted text', () => {
		expect(md('**<b>bold</b>**')).toBe('<strong>&lt;b&gt;bold&lt;/b&gt;</strong>');
	});

	it('keeps a link with a script URL literal text without rendering an anchor', () => {
		const html = md('[Link](javascript:alert(1))');

		expect(html).toBe('[Link](javascript:alert(1))');
		expect(html.includes('<a')).toBe(false);
	});
});
