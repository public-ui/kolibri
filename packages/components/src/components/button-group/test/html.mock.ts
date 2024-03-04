export const getButtonGroupHtml = (): string => {
	return `<kol-button-group class="kol-button-group">
	<mock:shadow-root>
		<kol-button-group-wc class="kol-button-group-wc">
			<slot></slot>
		</kol-button-group-wc>
	</mock:shadow-root>
</kol-button-group>`;
};
