let selector = 'kol-button[_label="Aktion ausführen"]';

document.querySelector(selector)._on = {
  onClick: () => {
    document.querySelector(selector).setAttribute('_disabled', 'true');
    var spins = document.querySelectorAll('kol-spin');
    spins.forEach((spin) => {
      spin.removeAttribute('style');
      spin.setAttribute('_show', 'true');
    });
    let timeout = setTimeout(() => {
      clearTimeout(timeout);
      spins.forEach((spin) => {
        spin.removeAttribute('_show');
      });
      document.querySelector(selector).removeAttribute('_disabled');
    }, 7500);
  },
};
