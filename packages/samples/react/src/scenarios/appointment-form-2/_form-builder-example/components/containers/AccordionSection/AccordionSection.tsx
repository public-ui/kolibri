import * as React from 'react';
import type { FieldDefinition } from '../../../types';
import StackSection from '../StackSection';
import { KolAccordion } from '@public-ui/react';

export type AccordionSectionProps = {
	label: string;
	open?: boolean;
	autoUnmounted?: boolean;
	fields: FieldDefinition[];
	namespace?: string;
};

function AccordionSection(props: AccordionSectionProps, ref: React.ForwardedRef<HTMLKolAccordionElement>) {
	const { namespace, label, open: initialOpen, autoUnmounted = true, fields } = props;

	const [open, setOpen] = React.useState(Boolean(initialOpen));

	const _on = React.useMemo(
		() => ({
			onClick: () => setOpen((o) => !o),
		}),
		[],
	);

	const specialProps = { _open: open, _on: autoUnmounted ? _on : undefined };

	return (
		<KolAccordion ref={ref} _label={label} {...specialProps}>
			{open && <StackSection namespace={namespace} fields={fields} />}
		</KolAccordion>
	);
}

export default React.forwardRef(AccordionSection);
