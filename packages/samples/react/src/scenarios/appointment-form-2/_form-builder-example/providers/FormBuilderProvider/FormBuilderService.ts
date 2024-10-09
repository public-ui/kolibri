import { BehaviorSubject } from 'rxjs';

export class FormBuilderService {
	private _initialValues: unknown | undefined;

	private _valuesSubject: BehaviorSubject<unknown>;

	public constructor(initialValue?: unknown) {
		this._initialValues = initialValue;
		this._valuesSubject = new BehaviorSubject(initialValue);
	}

	public setValues(next: unknown) {
		this._valuesSubject.next(next);
	}

	public get values$() {
		return this._valuesSubject;
	}

	public get values() {
		return this._valuesSubject.value;
	}

	public get initialValues() {
		return this._initialValues;
	}
}
