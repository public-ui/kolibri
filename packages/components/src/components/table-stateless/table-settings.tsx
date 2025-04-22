import type { JSX } from '@stencil/core';
import { Component, h } from '@stencil/core';
import { translate } from '../../i18n';
import { KolPopoverButtonWcTag, KolInputNumberTag, KolInputCheckboxTag, KolButtonWcTag } from '../../core/component-names';

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
			<KolPopoverButtonWcTag class="kol-table-settings" _icons="codicon codicon-settings-gear" _label={translate('kol-table-settings')} _hideLabel>
				<div class="kol-table-settings__content">
					<h2 class="kol-table-settings__title">{translate('kol-table-settings')}</h2>
					<div class="kol-table-settings__columns">
						<div class="kol-table-settings__column">
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
