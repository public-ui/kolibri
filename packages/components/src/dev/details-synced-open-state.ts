const detailsElement = document.getElementById('details') as HTMLKolDetailsElement;
const buttonElement = document.getElementById('button') as HTMLKolButtonElement;

if (detailsElement) {
	detailsElement._on = {
		onToggle: (_event: Event, open: boolean) => {
			buttonElement._label = `👆Details ${open ? 'schließen' : 'öffnen'}`;
		},
	};
}

if (buttonElement) {
	buttonElement._on = {
		onClick: () => {
			detailsElement._open = !detailsElement._open;
		},
	};
}

export default {};
