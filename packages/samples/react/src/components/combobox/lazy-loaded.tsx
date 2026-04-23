import { SuggestionsPropType } from '@public-ui/components';
import { KolCombobox, KolSpin } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useState } from 'react';
import { COUNTRY_SUGGESTIONS } from '../../shares/country';
import { SampleDescription } from '../SampleDescription';

const LoadingOverlayFC: FC<{
	show: boolean;
}> = ({ show }) => {
	if (show) {
		return (
			<div className="loading-overlay">
				<KolSpin
					_label="loading"
					_show={show}
					_variant="cycle"
					style={{
						backgroundColor: 'transparent',
					}}
				/>
			</div>
		);
	} else {
		return null;
	}
};

export const ComboboxLazyLoaded: FC = () => {
	const [suggestions, setSuggestions] = useState<SuggestionsPropType>([]);
	const [loading, setLoading] = useState<boolean>(false);

	function loadCountries() {
		if (suggestions.length > 0) {
			return;
		}
		setLoading(true);
		setTimeout(() => {
			setSuggestions(COUNTRY_SUGGESTIONS);
			setLoading(false);
		}, 5000);
	}

	return (
		<>
			<SampleDescription>
				<p>This combobox loads its list of countries 5 seconds after the first input of the user to simulate a call to the server.</p>
			</SampleDescription>

			<section className="w-full relative p-3">
				<KolCombobox _label="Lazy loaded countries" _suggestions={suggestions} onInput={() => loadCountries()} />
				<LoadingOverlayFC show={loading} />
			</section>
		</>
	);
};
