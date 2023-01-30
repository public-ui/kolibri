setTimeout(() => {
	document.querySelector('#click-link')._on = {
		onClick: () => {
			alert('hallo');
		},
	};
}, 500);
