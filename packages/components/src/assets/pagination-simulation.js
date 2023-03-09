var buttons = document.querySelectorAll('kol-pagination');
buttons.forEach((button) => {
  button._on = {
    onClick: (event, page) => {
      alert(`Pagination "${page}" wurde geklickt.`);
    },
  };
});
