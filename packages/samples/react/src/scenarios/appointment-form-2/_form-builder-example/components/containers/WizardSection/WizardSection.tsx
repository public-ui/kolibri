import * as React from 'react';
import { KolTabs } from '@public-ui/react';
import type { FormDefinition } from '../../../types';
import WizardProvider from '../../../providers/WizardProvider/WizardProvider';
import FormSection from '../FormSection';

export type WizardSectionProps = {
	label: string;
	fields: FormDefinition[];
};

function WizardSection(props: WizardSectionProps, ref: React.ForwardedRef<HTMLKolTabsElement>) {
	const { label, fields } = props;
	const tabCount = fields?.length || 0;
	const [selectedTab, setSelectedTab] = React.useState(0);
	const [activeFormSection, setActiveFormSection] = React.useState(0);

	React.useEffect(() => {
		setSelectedTab(activeFormSection);
	}, [activeFormSection]);

	const handleSubmitSucceeded = React.useCallback(
		(index?: number) => {
			if (typeof index !== 'number') {
				return;
			}

			const nextIndex = index + 1;

			if (nextIndex < 0 || nextIndex >= tabCount) {
				return;
			}

			setActiveFormSection(nextIndex);
		},
		[tabCount],
	);

	const _on = React.useMemo(
		() => ({
			onSelect: (_: Event, value: number): void => {
				setActiveFormSection(value);
			},
		}),
		[],
	);

	if (!fields?.length) {
		return null;
	}

	const tabHeaders = fields.map(({ label }, index) => ({ _label: label, _disabled: activeFormSection < index }));

	return (
		<WizardProvider>
			<KolTabs ref={ref} _label={label} _selected={selectedTab} _tabs={tabHeaders} _on={_on}>
				{fields.map((field, index) => (
					<div key={index}>
						<FormSection {...field} index={index} onSubmitSucceeded={handleSubmitSucceeded} />
					</div>
				))}
			</KolTabs>
		</WizardProvider>
	);
}

export default React.forwardRef(WizardSection);
