function openModal(modal, trigger) {
	modal._activeElement = trigger;
}
function closeModal(modal) {
	modal._activeElement = null;
}

function setModalFunctions(triggerSelector, modalSelector, closeSelector) {
	const trigger = document.querySelector(triggerSelector);
	const modal = document.querySelector(modalSelector);
	const close = document.querySelector(closeSelector);
	if (modal) {
		if (trigger) {
			trigger._on = {
				onClick: openModal(modal, trigger),
			};
		}
		modal._on = {
			onClose: closeModal(modal),
		};
	}
	if (close) {
		close._on = {
			onClick: closeModal(modal),
		};
	}
}

setModalFunctions('#modal-open-1', '#modal-1');
setModalFunctions('#modal-open-2', '#modal-2');
setModalFunctions('#tooltip_button', '#overviewModal');
