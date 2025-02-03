import type { VNode } from '@stencil/core';
import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import KolInputContainerFc from '../InputContainer';
import KolIconButtonFc from '../../IconButton';

describe('KolInputContainerFc', () => {
	it('should render correctly', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <KolInputContainerFc />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.tagName).toBe('DIV');
	});

	it('should render with startAdornment', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<KolInputContainerFc startAdornment={(<KolIconButtonFc componentName="icon" icon="start-icon" />) as VNode} />
		));
		expect(page.root).toMatchSnapshot();
		expect(page.root?.querySelector('kol-icon')).not.toBeNull();
	});

	it('should render with endAdornment', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<KolInputContainerFc endAdornment={(<KolIconButtonFc componentName="icon" icon="end-icon" />) as VNode} />
		));
		expect(page.root).toMatchSnapshot();
		expect(page.root?.querySelector('kol-icon')).not.toBeNull();
	});

	it('should render with both startAdornment and endAdornment', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<KolInputContainerFc
				startAdornment={(<KolIconButtonFc componentName="icon" icon="start-icon" />) as VNode}
				endAdornment={(<KolIconButtonFc componentName="icon" icon="end-icon" />) as VNode}
			/>
		));
		expect(page.root).toMatchSnapshot();
		expect(page.root?.querySelectorAll('kol-icon')).toHaveLength(2);
	});

	it('should render with children', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<KolInputContainerFc>
				<input type="text" />
			</KolInputContainerFc>
		));
		expect(page.root).toMatchSnapshot();
		expect(page.root?.querySelector('input')).not.toBeNull();
	});
});
