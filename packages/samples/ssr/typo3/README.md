# KoliBri SSR in TYPO3

This guide describes how to use server-side rendered KoliBri components inside
TYPO3. It complements the runnable Node sample in the
[parent folder](../README.md) and addresses the “Vite + Typo3” goal of
[issue #5494](https://github.com/public-ui/kolibri/issues/5494).

There are two concerns, and they are independent:

1. **Producing** the pre-rendered, Declarative-Shadow-DOM markup (the SSR step).
2. **Keeping** the `kol-*` markup intact through TYPO3’s HTML sanitizing.

## 1. Produce the markup (SSR)

You can render KoliBri components to Declarative Shadow DOM in two ways:

### a) In the Node build / a sidecar service

Use `@public-ui/hydrate` directly (see the parent sample), or run the ready-made
[`@public-ui/hydrate-server`](../../../tools/hydrate-server/README.md) and call
its REST endpoint from a TYPO3 middleware, an Extbase controller or a Fluid
ViewHelper:

```bash
curl -X POST -H 'Content-Type: application/json' \
     -d '{"html":"<kol-button _label=\"Server Rendered\"></kol-button>"}' \
     http://localhost:3000/render
# → { "html": "<kol-button …><template shadowrootmode=\"open\">…</template></kol-button>", … }
```

Inject the returned `html` into your Fluid template with `f:format.raw` (the
markup comes from a trusted service, so it must **not** be sanitized again):

```html
<!-- Resources/Private/Templates/.../KolibriComponent.html -->
<f:format.raw>{prerenderedMarkup}</f:format.raw>
```

### b) Pre-rendered fragments authored by editors

If editors author `kol-*` markup (RTE, content elements, Fluid partials), the
markup is processed by TYPO3’s HTML Sanitizer and the components/attributes are
stripped unless you allow them — see step 2.

## 2. Allow `kol-*` through the HTML Sanitizer

Since TYPO3 v10 all rich-text/content output runs through the
[HTML Sanitizer](https://docs.typo3.org/permalink/changelog:feature-87193-1657908326).
Custom elements (`kol-*`) and KoliBri’s `_`-prefixed attributes are removed by
the default behavior, so provide a custom sanitizer builder.

### The builder

[`Classes/Sanitizer/CustomHtmlSanitizer.php`](./Classes/Sanitizer/CustomHtmlSanitizer.php)
extends TYPO3’s `DefaultSanitizerBuilder` and

- adds the `Behavior::ALLOW_CUSTOM_ELEMENTS` flag (permits any hyphenated tag,
  i.e. `kol-*`), and
- registers a global `_`-prefix attribute matcher so `_label`, `_variant`,
  `_icons`, … survive.

```php
class CustomHtmlSanitizer extends DefaultSanitizerBuilder
{
    public function __construct()
    {
        parent::__construct();
        $this->globalAttrs[] = new Behavior\Attr('_', Behavior\Attr::NAME_PREFIX);
    }

    public function createBehavior(): Behavior
    {
        $behavior = parent::createBehavior();
        return $behavior->withFlags($behavior->getFlags() | Behavior::ALLOW_CUSTOM_ELEMENTS);
    }
}
```

> The minimal web-component variant in
> [`fgeierst/typo3-lit-demo`](https://github.com/fgeierst/typo3-lit-demo) only
> sets `ALLOW_CUSTOM_ELEMENTS`. KoliBri additionally needs the `_`-prefix
> attribute matcher shown above, otherwise the component props are dropped.

### Register the builder

Override the `default` builder in your extension’s `ext_localconf.php` (verify
the key for your TYPO3 version against the official docs):

```php
// ext_localconf.php
$GLOBALS['TYPO3_CONF_VARS']['SYS']['htmlSanitizer']['default']
    = \Vendor\SiteDistribution\Sanitizer\CustomHtmlSanitizer::class;
```

The default `lib.parseFunc` / `lib.parseFunc_RTE` already runs sanitizing
(`htmlSanitize = 1`), so once the `default` builder is replaced, editor content
containing `kol-*` markup is preserved.

## 3. Reveal the components without JavaScript

Stencil’s hydrate output marks each host element with
`style="visibility: hidden;"`. Add this rule to your site CSS so the
pre-rendered components are visible without any client-side JavaScript (an
`!important` stylesheet rule outranks the inline style):

```css
[class~='hydrated'] {
	visibility: visible !important;
}
```

## Acceptance criterion

> A TYPO3 page renders a KoliBri component server-side with correct
> pre-hydration markup.

Concretely: a TYPO3 response contains
`<kol-… ><template shadowrootmode="open">…</template></kol-…>` with the
component-scoped `<style>` inside the template, and the component is correct and
visible with JavaScript disabled.

## References

- Declarative Shadow DOM – https://developer.chrome.com/articles/declarative-shadow-dom/
- TYPO3 HTML Sanitizer – https://docs.typo3.org/permalink/changelog:feature-87193-1657908326
- `typo3/html-sanitizer` – https://github.com/TYPO3/html-sanitizer
- Web-component reference demo – https://github.com/fgeierst/typo3-lit-demo
- `@public-ui/hydrate` – ../../../adapters/hydrate/README.md
- `@public-ui/hydrate-server` – ../../../tools/hydrate-server/README.md
