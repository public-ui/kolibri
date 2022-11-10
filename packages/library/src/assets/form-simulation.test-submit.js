document.querySelectorAll('form').forEach((form) => {
	form.onsubmit = console.log;
});
