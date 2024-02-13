export const getButtonWcHtml = (): string => {
	return `<demo-button-wc></demo-button-wc>`;
};

export const getButtonHtml = (): string => {
	return `<demo-button>
  <mock:shadow-root>
    ${getButtonWcHtml()}
  </mock:shadow-root>
</demo-button>`;
};
