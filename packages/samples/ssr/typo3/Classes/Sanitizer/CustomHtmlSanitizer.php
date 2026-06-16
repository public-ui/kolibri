<?php

declare(strict_types=1);

namespace Vendor\SiteDistribution\Sanitizer;

use TYPO3\CMS\Core\Html\DefaultSanitizerBuilder;
use TYPO3\HtmlSanitizer\Behavior;

/**
 * Custom HTML Sanitizer that lets KoliBri web components survive TYPO3's
 * server-side HTML sanitizing (e.g. RTE content, `lib.parseFunc`, content
 * elements).
 *
 * Two things are required for KoliBri:
 *
 *  1. The `kol-*` custom element TAGS must be allowed. TYPO3's sanitizer
 *     supports this out of the box via the `ALLOW_CUSTOM_ELEMENTS` flag — any
 *     element whose name contains a hyphen is permitted (per the WHATWG custom
 *     element naming rules).
 *
 *  2. KoliBri exposes its component properties as `_`-prefixed ATTRIBUTES
 *     (`_label`, `_variant`, `_icons`, …). Unknown attributes are stripped by
 *     default, so we register a global prefix matcher that keeps every
 *     attribute starting with an underscore.
 *
 * Adapted for KoliBri from the web-component sanitizer in
 * https://github.com/fgeierst/typo3-lit-demo (see issue #5494).
 *
 * @see https://docs.typo3.org/c/typo3/cms-core/main/en-us/Changelog/10.0/Feature-87193-IntegrateHTMLSanitizer.html
 */
class CustomHtmlSanitizer extends DefaultSanitizerBuilder
{
    public function __construct()
    {
        parent::__construct();

        // Keep every `_`-prefixed attribute (KoliBri component props such as
        // `_label`, `_variant`, `_icons`). `Attr::NAME_PREFIX` turns the name
        // into a prefix matcher instead of an exact match.
        $this->globalAttrs[] = new Behavior\Attr('_', Behavior\Attr::NAME_PREFIX);
    }

    public function createBehavior(): Behavior
    {
        // `ALLOW_CUSTOM_ELEMENTS` permits tags that contain a hyphen (kol-*).
        // We keep the inherited flags and add the custom-elements capability.
        $behavior = parent::createBehavior();

        return $behavior->withFlags($behavior->getFlags() | Behavior::ALLOW_CUSTOM_ELEMENTS);
    }
}
