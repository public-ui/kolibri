/* eslint-disable no-undef */
var toastButtons = document.querySelectorAll('kol-button[_label="Toast starten"]');

toastButtons.forEach((button) => {
	console.log(button);
	button._on = {
		onClick: createAndShowToast,
	};
});

function createAndShowToast() {
	console.log('Toast');
	const toast = document.createElement('kol-toast');
	toast.setAttribute('_heading', 'Ich bin ein Toast!');
	toast.setAttribute('_level', '3');
	toast.setAttribute('_show-duration', '10000');
	toast.setAttribute('_type', 'info');
	toast.innerText = `Ich werde in 10 Sekunden automatisch wieder ausgeblendet.`;
	document.body.appendChild(toast);
}
