const CHECKBOX2 = new LeanUpForm.InputControl('checkbox');
CHECKBOX2.changeListeners.add(console.log);

document.querySelectorAll('#change-checkbox').forEach((checkbox) => {
	checkbox._control = CHECKBOX2;
	checkbox._on = {
		onChange: console.warn,
	};
});

function onNativeSubmit(event) {
	event.preventDefault();
	console.log('native form', event);
}
function onKoliBriSubmit(event) {
	event.preventDefault();
	console.log('kolibri form', event);
}

document.querySelectorAll('form').forEach((form) => {
	form.onsubmit = onNativeSubmit;
});

document.querySelectorAll('kol-form').forEach((kolForm) => {
	kolForm._on = {
		onSubmit: onKoliBriSubmit,
	};
});
