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
			<KolPopoverButtonWcTag class="kol-table-settings" _icons="codicon codicon-settings-gear" _label={translate('kol-table-configuration')} _hideLabel>
				<div class="kol-table-settings__content">
					<h2 class="kol-table-settings__title">Table Configuration</h2>
					<div class="kol-table-settings__columns">
						{/* Left Column */}
						<div class="kol-table-settings__column">
							<KolInputCheckboxTag _checked _label="Show column Left Column" _hideLabel />
							<span>Left Column</span>

							<KolInputNumberTag _hideLabel _value={10} _label="Left Column Width" />
							<KolButtonWcTag _icons="codicon codicon-arrow-up" _label="Move column up" _hideLabel _variant="ghost" />
							<KolButtonWcTag _icons="codicon codicon-arrow-down" _label="Move column down" _hideLabel _variant="ghost" />
						</div>
					</div>

					<div class="kol-table-settings__actions">
						<KolButtonWcTag _label="Cancel" _variant="secondary" />
						<KolButtonWcTag _label="Apply" _variant="primary" />
					</div>
				</div>
			</KolPopoverButtonWcTag>
		);
	}
}
