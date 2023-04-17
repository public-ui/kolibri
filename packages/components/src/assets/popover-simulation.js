/* eslint-disable no-undef */
const buttonTop = document.querySelector('#popover-button-top');
const buttonRight = document.querySelector('#popover-button-right');
const buttonBottom = document.querySelector('#popover-button-bottom');
const buttonLeft = document.querySelector('#popover-button-left');
const buttonLogin = document.querySelector('#popover-button-login');

const popoverTop = document.querySelector('#popover-top');
const popoverRight = document.querySelector('#popover-right');
const popoverBottom = document.querySelector('#popover-bottom');
const popoverLeft = document.querySelector('#popover-left');
const popoverLogin = document.querySelector('#popover-login');

if (buttonTop && popoverTop) {
	buttonTop._on = { onClick: () => popoverTop.setAttribute('_open', '') };
}
if (buttonRight && popoverRight) {
	buttonRight._on = { onClick: () => popoverRight.setAttribute('_open', '') };
}
if (buttonBottom && popoverBottom) {
	buttonBottom._on = { onClick: () => popoverBottom.setAttribute('_open', '') };
}
if (buttonLeft && popoverLeft) {
	buttonLeft._on = { onClick: () => popoverLeft.setAttribute('_open', '') };
}
if (buttonLogin && popoverLogin) {
	buttonLogin._on = { onClick: () => popoverLogin.setAttribute('_open', '') };
}
