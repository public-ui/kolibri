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
	console.log("popover-top set")
	buttonTop._on = { onClick: () => popoverTop.setAttribute('_show', '') };
}
if (buttonRight && popoverRight) {
	console.log("popover-right set")
	buttonRight._on = { onClick: () => popoverRight.setAttribute('_show', '') };
}
if (buttonBottom && popoverBottom) {
	console.log("popover-bottom set")
	buttonBottom._on = { onClick: () => popoverBottom.setAttribute('_show', '') };
}
if (buttonLeft && popoverLeft) {
	console.log("popover-left set")
	buttonLeft._on = { onClick: () => popoverLeft.setAttribute('_show', '') };
}
if (buttonLogin && popoverLogin) {
	console.log("popover-login set")
	buttonLogin._on = { onClick: () => popoverLogin.setAttribute('_show', '') };
}
