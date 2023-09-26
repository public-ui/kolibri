import { FormControl, InputControl, RequiredValidator, ValidationHandler } from '@leanup/form';

export interface Schedule {
	schedule: string;
	time: string;
}

export class ScheduleForm extends FormControl {
	public constructor() {
		super('schedule');

		this.addControl(
			new InputControl('schedule', {
				label: 'Datum',
				mandatory: true,
			})
		);

		this.addControl(
			new InputControl('time', {
				label: 'Uhrzeit',
				mandatory: true,
			})
		);

		const validationHandler = new ValidationHandler();
		validationHandler.validators.add([new RequiredValidator('Bitte wählen Sie ein Datum aus.')]);
		this.getInput('schedule')?.setValidationHandler(validationHandler);

		const timeHandler = new ValidationHandler();
		timeHandler.validators.add([new RequiredValidator('Bitte wählen Sie eine Uhrzeit aus.')]);
		this.getInput('time')?.setValidationHandler(timeHandler);
	}
}
