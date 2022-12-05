const CHECKBOX2 = new LeanUpForm.InputControl('checkbox');
CHECKBOX2.changeListeners.add(console.log);

document.querySelectorAll('#change-checkbox').forEach((checkbox) => {
	checkbox._control = CHECKBOX2;
	checkbox._on = {
		onChange: console.warn,
	};
});

function outlineLogs(event) {
	event.preventDefault();
	const data = new FormData(event.target);
	console.log([...data.entries()]);
}
function onNativeSubmit(event) {
	console.log('native form', event);
	outlineLogs(event);
}
function onKoliBriSubmit(event) {
	console.log('kolibri form', event);
	outlineLogs(event);
}

document.querySelectorAll('form').forEach((form) => {
	form.onsubmit = onNativeSubmit;
});

document.querySelectorAll('kol-form').forEach((kolForm) => {
	kolForm._on = {
		onSubmit: onKoliBriSubmit,
	};
});
