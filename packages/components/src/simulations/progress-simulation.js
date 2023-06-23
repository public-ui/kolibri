const simButtons = document.querySelectorAll('kol-button[class*="progress"]');
const progressBars = document.querySelectorAll('kol-progress[class*="progress"]');

function runProcess(index) {
	let percent = 0;
	console.log(simButtons[index], index);
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

const schnitzelWert = document.querySelector('[_id="schnitzelwert"]');
const progressOut = document.querySelector('[_id="schnitzelfortschritt"]');
if (schnitzelWert && progressOut) schnitzelWert._on = { onChange: onSchnitzelChange };

function onSchnitzelChange(e, value) {
	progressOut.setAttribute('_value', value);
}
