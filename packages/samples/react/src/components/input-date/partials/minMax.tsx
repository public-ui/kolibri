import type { Components } from '@public-ui/components';
import { KolInputDate } from '@public-ui/react-v19';
import React from 'react';

import { SampleBlock } from '../../SampleBlock';

type InputDateMinMaxCasesProps = Components.KolInputDate & {
	/** Prefixes the visual block ids so the same cases can be rendered more than once per route. */
	blockIdPrefix: string;
};

export const InputDateMinMaxCases = ({ blockIdPrefix, ...props }: InputDateMinMaxCasesProps) => {
	const minDateIso = '2024-09-26';
	const maxDateIso = '2024-09-27';

	const minTimeIso = '12:00';
	const maxTimeIso = '15:00';

	const minDayTimeIso = '2024-09-26T12:00';
	const maxDaytimeIso = '2024-09-27T15:00';

	const minWeekIso = '2024-W10';
	const maxWeekIso = '2024-W50';

	const minMonthIso = '2024-02';
	const maxMonthIso = '2024-10';

	const minDate = new Date('January 10, 2024, 12:00');
	const maxDate = new Date('October 20, 2024, 15:00');
	return (
		<div className="grid gap-4">
			<SampleBlock id={`${blockIdPrefix}-date-iso`}>
				<KolInputDate {...props} _type="date" _label="Date with Iso" _min={minDateIso} _max={maxDateIso} />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-date-object`}>
				<KolInputDate {...props} _type="date" _label="Date with Date" _min={minDate} _max={maxDate} />
			</SampleBlock>

			<SampleBlock id={`${blockIdPrefix}-time-iso`}>
				<KolInputDate {...props} _type="time" _label="Time with Iso" _min={minTimeIso} _max={maxTimeIso} />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-time-object`}>
				<KolInputDate {...props} _type="time" _label="Time with Date" _min={minDate} _max={maxDate} />
			</SampleBlock>

			<SampleBlock id={`${blockIdPrefix}-datetime-iso`}>
				<KolInputDate {...props} _type="datetime-local" _label="DayTime with Iso" _min={minDayTimeIso} _max={maxDaytimeIso} />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-datetime-object`}>
				<KolInputDate {...props} _type="datetime-local" _label="DayTime with Date" _min={minDate} _max={maxDate} />
			</SampleBlock>

			<SampleBlock id={`${blockIdPrefix}-week-iso`}>
				<KolInputDate {...props} _type="week" _label="Week with Iso" _min={minWeekIso} _max={maxWeekIso} />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-week-object`}>
				<KolInputDate {...props} _type="week" _label="Week with Date" _min={minDate} _max={maxDate} />
			</SampleBlock>

			<SampleBlock id={`${blockIdPrefix}-month-iso`}>
				<KolInputDate {...props} _type="month" _label="Month with Iso" _min={minMonthIso} _max={maxMonthIso} />
			</SampleBlock>
			<SampleBlock id={`${blockIdPrefix}-month-object`}>
				<KolInputDate {...props} _type="month" _label="Month with Date" _min={minDate} _max={maxDate} />
			</SampleBlock>
		</div>
	);
};
