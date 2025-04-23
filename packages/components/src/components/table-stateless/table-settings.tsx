import type { JSX } from '@stencil/core';
import { Component, h } from '@stencil/core';
import { translate } from '../../i18n';
import { KolPopoverButtonWcTag, KolInputNumberTag, KolInputCheckboxTag, KolButtonWcTag, KolHeadingTag } from '../../core/component-names';

/**
 * @internal
 */
@Component({
	tag: 'kol-table-settings-wc',
	shadow: false,
})
export class KolTableSettings {
	public render(): JSX.Element {
		return (
			<KolPopoverButtonWcTag
				class="kol-table-settings"
				_icons="codicon codicon-settings-gear"
				_label={translate('kol-table-settings')}
				_popoverAlign="top"
				_hideLabel
			>
				<div class="kol-table-settings__content">
					<KolHeadingTag _label={translate('kol-table-settings')} _level={0} />

					<div class="kol-table-settings__columns-container">
						<div class="kol-table-settings__columns">
							<KolInputCheckboxTag _checked _label={translate('kol-table-settings-show-column', { placeholders: { column: 'Left Column' } })} _hideLabel />
							<span>Left Column</span>
							<KolInputNumberTag _hideLabel _value={10} _label={translate('kol-table-settings-column-width', { placeholders: { column: 'Left Column' } })} />
							<KolButtonWcTag _icons="codicon codicon-arrow-up" _label={translate('kol-table-settings-move-up')} _hideLabel _variant="ghost" />
							<KolButtonWcTag _icons="codicon codicon-arrow-down" _label={translate('kol-table-settings-move-down')} _hideLabel _variant="ghost" />

							<KolInputCheckboxTag _checked _label={translate('kol-table-settings-show-column', { placeholders: { column: 'Left Column' } })} _hideLabel />
							<span>Left Column</span>
							<KolInputNumberTag _hideLabel _value={10} _label={translate('kol-table-settings-column-width', { placeholders: { column: 'Left Column' } })} />
							<KolButtonWcTag _icons="codicon codicon-arrow-up" _label={translate('kol-table-settings-move-up')} _hideLabel _variant="ghost" />
							<KolButtonWcTag _icons="codicon codicon-arrow-down" _label={translate('kol-table-settings-move-down')} _hideLabel _variant="ghost" />

							<KolInputCheckboxTag _checked _label={translate('kol-table-settings-show-column', { placeholders: { column: 'Left Column' } })} _hideLabel />
							<span>Left Column</span>
							<KolInputNumberTag _hideLabel _value={10} _label={translate('kol-table-settings-column-width', { placeholders: { column: 'Left Column' } })} />
							<KolButtonWcTag _icons="codicon codicon-arrow-up" _label={translate('kol-table-settings-move-up')} _hideLabel _variant="ghost" />
							<KolButtonWcTag _icons="codicon codicon-arrow-down" _label={translate('kol-table-settings-move-down')} _hideLabel _variant="ghost" />

							<KolInputCheckboxTag _checked _label={translate('kol-table-settings-show-column', { placeholders: { column: 'Left Column' } })} _hideLabel />
							<span>Left Column</span>
							<KolInputNumberTag _hideLabel _value={10} _label={translate('kol-table-settings-column-width', { placeholders: { column: 'Left Column' } })} />
							<KolButtonWcTag _icons="codicon codicon-arrow-up" _label={translate('kol-table-settings-move-up')} _hideLabel _variant="ghost" />
							<KolButtonWcTag _icons="codicon codicon-arrow-down" _label={translate('kol-table-settings-move-down')} _hideLabel _variant="ghost" />

							<KolInputCheckboxTag _checked _label={translate('kol-table-settings-show-column', { placeholders: { column: 'Left Column' } })} _hideLabel />
							<span>Left Column</span>
							<KolInputNumberTag _hideLabel _value={10} _label={translate('kol-table-settings-column-width', { placeholders: { column: 'Left Column' } })} />
							<KolButtonWcTag _icons="codicon codicon-arrow-up" _label={translate('kol-table-settings-move-up')} _hideLabel _variant="ghost" />
							<KolButtonWcTag _icons="codicon codicon-arrow-down" _label={translate('kol-table-settings-move-down')} _hideLabel _variant="ghost" />
						</div>
					</div>

					<div class="kol-table-settings__actions">
						<KolButtonWcTag _label={translate('kol-table-settings-cancel')} _variant="secondary" />
						<KolButtonWcTag _label={translate('kol-table-settings-apply')} _variant="primary" />
					</div>
				</div>
			</KolPopoverButtonWcTag>
		);
	}
}
