var buttons = document.querySelectorAll('kol-button.not-used');
buttons.forEach((button) => {
  button._on = {
    onClick: () => {
      alert(`Button "${button._label}" wurde geklickt.`);
    },
  };
});

const toc = document.querySelector(`kol-link-group#table-of-content`);
const toc_links = [];
const timeout = setTimeout(() => {
  clearTimeout(timeout);
  document.querySelectorAll('div.row > div.col-12 > kol-heading[_level="2"]').forEach((heading, index) => {
    if (heading.innerText !== 'Ich bin eine h2-Überschrift') {
      heading.setAttribute('id', `heading-${index}`);
      heading.setAttribute('tabindex', `0`);
      toc_links.push({
        _label: heading.innerText,
        _selector: `#heading-${index}`,
      });
    }
  });
  toc._links = toc_links;
  console.log(toc_links);
}, 5000);

const toc_button = document.querySelector(`kol-button#table-of-content-button`);
toc_button._on = {
  onClick: () => {
    if (toc !== null) {
      window.scrollTo({
        behavior: 'smooth',
        top: toc.getBoundingClientRect().top + window.pageYOffset - 50,
      });
      toc.focus();
    }
  },
};
