import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import type { ColorPair, KoliBriIconsProp } from '../../../schema';
import { BadgeFC } from '../badge/component';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { VersionApi } from './api';

type VersionFCProps = Pick<FunctionalComponentProps<VersionApi>, 'class' | 'label'> & {
	/** Contrast-safe badge colour pair, fixed by the web component. */
	color: ColorPair;
	/** Icon class plus its translated accessible label, rendered left inside the badge. */
	icons: KoliBriIconsProp;
};

/**
 * The version is a fixed-shape badge: one left icon (`kolicon-version`) with a translated
 * accessible label and the version string as text. It owns no interactivity, so the badge is
 * rendered without a smart button.
 *
 * The badge box lives in this shadow root rather than in a nested `kol-badge` element:
 * `version/style.scss` includes `kol-badge-styles()` and every theme maps `KOL-VERSION` onto its
 * badge mixin, so both style layers arrive where `BadgeFC` renders.
 */
export const VersionFC: FC<VersionFCProps> = ({ class: hostClass, color, icons, label }) => {
	return (
		<BemRootNodeFC block="kol-version" class={hostClass}>
			<BadgeFC color={color} icons={icons} label={label} />
		</BemRootNodeFC>
	);
};
