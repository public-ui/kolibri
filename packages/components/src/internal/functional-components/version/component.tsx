import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import { KolBadgeTag } from '../../../core/component-names';
import type { KoliBriIconsProp } from '../../../schema';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { VersionApi } from './api';

type VersionFCProps = Pick<FunctionalComponentProps<VersionApi>, 'class' | 'label'> & {
	/** Raw badge background color, normalized by the badge web component itself. */
	color: string;
	/** Icon class plus its translated accessible label, rendered left inside the badge. */
	icons: KoliBriIconsProp;
};

/**
 * The version is a fixed-shape badge: one left icon (`kolicon-version`) with a translated
 * accessible label and the version string as text. It owns no interactivity, so the badge is
 * rendered without a smart button.
 *
 * The transitional `kol-badge` web component stays as the leaf: its shadow root carries the
 * badge base and theme styles, and no theme ships `kol-version` styles the version shadow root
 * could adopt — inlining the badge functional component here would lose both and collapse the
 * badge box.
 */
export const VersionFC: FC<VersionFCProps> = ({ class: hostClass, color, icons, label }) => {
	return (
		<BemRootNodeFC block="kol-version" class={hostClass}>
			<KolBadgeTag _color={color} _icons={icons} _label={label} />
		</BemRootNodeFC>
	);
};
