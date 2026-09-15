import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { ColorPair, KoliBriIconsProp } from '../../../schema';
import { BadgeFC } from '../badge/component';
import { BemRootNodeFC } from '../bem-root-node/component';
import type { FunctionalComponentProps } from '../generic-types';
import type { VersionApi } from './api';

type VersionFCProps = Pick<FunctionalComponentProps<VersionApi>, 'class' | 'label'> & {
	/** Normalized color pair for the badge background/foreground. */
	color: ColorPair;
	/** Icon class plus its translated accessible label, rendered left inside the badge. */
	icons: KoliBriIconsProp;
};

const noop = (): void => {};
const noopRef = (): void => {};

/**
 * The version is a fixed-shape badge: one left icon (`kolicon-version`) with a translated
 * accessible label and the version string as text. It owns no interactivity, so the badge is
 * rendered without a smart button — the handler/ref props `BadgeFC` requires stay inert.
 */
export const VersionFC: FC<VersionFCProps> = ({ class: hostClass, color, icons, label }) => {
	return (
		<BemRootNodeFC block="kol-version" class={hostClass}>
			<BadgeFC
				ariaDescriptionId=""
				color={color}
				handleBlur={noop}
				handleClick={noop}
				handleFocus={noop}
				handleMouseDown={noop}
				icons={icons}
				label={label}
				labelId=""
				refSmartButton={noopRef}
				refTooltip={noopRef}
			/>
		</BemRootNodeFC>
	);
};
