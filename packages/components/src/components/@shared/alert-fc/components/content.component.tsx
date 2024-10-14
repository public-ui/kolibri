import { h } from '@stencil/core';
import type { FunctionalComponent as FC } from '@stencil/core';

const Content: FC = (_, children) => {
	return <div class="content">{children}</div>;
};

export default Content;
