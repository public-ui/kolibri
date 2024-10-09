import * as React from 'react';
import { KolTabs } from '@public-ui/react';
import type { FieldDefinition } from '../../../types';
import type { AlignPropType } from '@public-ui/components';
import StackSection from '../StackSection';

export type TabsSectionProps = {
	label: string;
	align?: AlignPropType;
	tabs: {
		label: string;
		namespace?: string;
		fields: FieldDefinition[];
	}[];
};

function TabsSection(props: TabsSectionProps, ref: React.ForwardedRef<HTMLKolTabsElement>) {
	const { label, tabs, align } = props;

	const [selected, setSelected] = React.useState(0);

	const _on = React.useMemo(
		() => ({
			onSelect: (_: Event, value: number): void => {
				setSelected(value);
			},
		}),
		[],
	);

	const tabNames = tabs.map(({ label }) => ({ _label: label }));

	return (
		<KolTabs ref={ref} _selected={selected} _label={label} _align={align} _tabs={tabNames} _on={_on}>
			{tabs.map(({ namespace, fields }, index) => (
				<div key={index}>{selected === index && <StackSection namespace={namespace} fields={fields} />}</div>
			))}
		</KolTabs>
	);
}

export default React.forwardRef(TabsSection);
