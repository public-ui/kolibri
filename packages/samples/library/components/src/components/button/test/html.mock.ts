export const getButtonWcHtml = (): string => {
	return `<demo-button-wc>
		<kol-button _label="Test"></kol-button>
	</demo-button-wc>`;
};

export const getButtonHtml = (): string => {
	return `<demo-button>
  <mock:shadow-root>
    ${getButtonWcHtml()}
  </mock:shadow-root>
</demo-button>`;
};
