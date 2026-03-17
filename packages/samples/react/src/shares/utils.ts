export const logKoliBriNativeEvent = (event: React.SyntheticEvent) => {
	console.log(`${event.type} (Native Event)`, event);
};

export const logKoliBriCallbackEvent = (event: Event) => {
	console.log(`${event.type} (Callback Event)`, event);
};
