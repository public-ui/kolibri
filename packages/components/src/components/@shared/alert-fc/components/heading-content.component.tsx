import { h } from '@stencil/core';
import type { FunctionalComponent as FC } from '@stencil/core';
import { DEFAULT_PROPS, type KolAlertFcProps } from '../_types';
import Content from './content.component';
import { KolHeadingWcTag } from '../../../../core/component-names';

const HeadingContent: FC<KolAlertFcProps> = ({ _label, _level = DEFAULT_PROPS._level, _variant = DEFAULT_PROPS._variant }, children) => {
	const content: unknown[] = [];

	if (_label) {
		content.push(<KolHeadingWcTag _label={_label} _level={_level} />);
	}

	if (_variant === 'msg') {
		content.push(<Content>{children}</Content>);
	}

	return <div class="heading-content">{content}</div>;
};

export default HeadingContent;
