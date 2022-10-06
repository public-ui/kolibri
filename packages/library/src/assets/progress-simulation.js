var simButtons = document.querySelectorAll('kol-button[_label="Simulation starten"]');
var progressBars = document.querySelectorAll('kol-progress');

function runProcess(index) {
  var percent = 0;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log(simButtons[index]);
  simButtons[index].setAttribute('_disabled', 'true');
  var interval = setInterval(() => {
    if (percent <= 100) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      progressBars[index].setAttribute('_value', percent);
      percent += 1;
    } else {
      clearInterval(interval);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
