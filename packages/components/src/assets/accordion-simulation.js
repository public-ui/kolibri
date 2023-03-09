setTimeout(() => {
	var accordions = document.querySelectorAll('kol-accordion');
	accordions.forEach((accordion) => {
		accordion._on = {
			onClick: (event, open) => {
				console.log(`Accordion`, open === true ? 'Auf' : 'Zu', event, open);
			},
		};
	});
}, 1000);
