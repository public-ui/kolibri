/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-undef */
const simButtons = document.querySelectorAll('kol-button[_label="Simulation starten"]');
const progressBars = document.querySelectorAll('kol-progress');

function runProcess(index) {
	let percent = 0;
	console.log(simButtons[index]);
	simButtons[index].setAttribute('_disabled', 'true');
	const interval = setInterval(() => {
		if (percent <= 100) {
			progressBars[index].setAttribute('_value', percent);
			percent += 1;
		} else {
			clearInterval(interval);
			simButtons[index].removeAttribute('_disabled');
		}
	}, 50);
}

simButtons.forEach((button, index) => {
	button._on = {
		onClick: () => {
			runProcess(index);
		},
	};
});

document.querySelector('[_id="schnitzelwert"]')._on = { onChange: onSchnitzelchange };
const progressOut = document.querySelector('[_id="schnitzelfortschritt"]');
function onSchnitzelchange(e, value) {
	progressOut.setAttribute('_value', value);
}
