import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { AlertTypePropType } from '@public-ui/components';
import { ToasterService } from '@public-ui/components';
import { KolButton, KolInputRadio } from '@public-ui/react-v19';

import { SampleDescription } from '../SampleDescription';

import type { FC } from 'react';

const toastTypes = ['default', 'info', 'success', 'warning', 'error'] as const;
const toastTypeOptions = toastTypes.map((type) => ({
	label: type,
	value: type,
}));

const isAlertType = (value: unknown): value is AlertTypePropType => {
	return typeof value === 'string' && toastTypes.includes(value as AlertTypePropType);
};

export const ToastConfigurator: FC = () => {
	const [searchParams] = useSearchParams();
	const queryType = searchParams.get('type');
	const defaultType = isAlertType(queryType) ? queryType : undefined;
	const [selectedType, setSelectedType] = useState<AlertTypePropType>(() => defaultType ?? 'default');
	const toaster = useMemo(
		() =>
			ToasterService.getInstance(document, {
				defaultVariant: 'card',
			}),
		[],
	);

	useEffect(() => {
		if (defaultType) {
			setSelectedType(defaultType);
			void toaster.enqueue({
				description: 'Toasty',
				label: `Toast with type '${defaultType}'`,
				type: defaultType,
			});
		}
	}, [defaultType, toaster]);

	const handleTypeChange = (_: Event, value: unknown) => {
		if (isAlertType(value)) {
			setSelectedType(value);
		}
	};

	const handleConfiguredToast = () => {
		void toaster.enqueue({
			description: 'Toasty',
			label: `Toast with type '${selectedType}'`,
			type: selectedType,
		});
	};

	const closeAll = () => {
		toaster.closeAll();
	};

	return (
		<>
			<SampleDescription>
				<p>
					This sample demonstrates the toast service with all its options. Use the configuration below to choose a toast type and open a toast with the card
					variant.
				</p>
			</SampleDescription>
			<section className="grid gap-4">
				<KolInputRadio _orientation="horizontal" _label="Toast type" _value={selectedType} _options={toastTypeOptions} _on={{ onChange: handleTypeChange }} />
				<div className="flex flex-wrap gap-2">
					<KolButton _label={`Open ${selectedType} toast`} _on={{ onClick: handleConfiguredToast }}></KolButton>
					<KolButton _label="Close all toasts" _on={{ onClick: closeAll }}></KolButton>
				</div>
			</section>
		</>
	);
};
