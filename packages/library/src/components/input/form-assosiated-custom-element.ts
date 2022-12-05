/**
 * github.com/ionic-team/stencil/issues/2284
 */

type RelatedFormControl = HTMLElement & {
	_id: string;
	_name: string;
	_type: string;
	_value: string;
};

class FormAssociated extends HTMLElement {
	public static formAssociated = true;

	public readonly related: RelatedFormControl;

	public constructor() {
		super();
		this.related = this.getAttribute('rel') as unknown as RelatedFormControl;
	}

	get form() {
		return this.attachInternals().form;
	}
	get name() {
		return 'name';
	}
	get type() {
		return 'text';
	}
	get value() {
		return 'value';
	}

	// get validity() {
	// 	return this.attachInternals().validity;
	// }
	// get validationMessage() {
	// 	return this.attachInternals().validationMessage;
	// }
	get willValidate() {
		return this.attachInternals().willValidate;
	}

	// checkValidity() {
	// 	return this.attachInternals().checkValidity();
	// }
	// reportValidity() {
	// 	return this.attachInternals().reportValidity();
	// }
}
customElements.define('kol-form-associated', FormAssociated);
