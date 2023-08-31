const detailsElement = document.getElementById('details') as HTMLKolDetailsElement;
const buttonElement = document.getElementById('button') as HTMLKolButtonElement;

detailsElement._on = {
	onToggle: (_event, open: boolean) => {
		buttonElement._label = `👆Details ${open ? 'schließen' : 'öffnen'}`;
	},
};

buttonElement._on = {
	onClick: () => {
		detailsElement._open = !detailsElement._open;
	},
};

export default {};
