import { KolSingleSelect } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router';
import { SampleDescription } from '../SampleDescription';

export const SingleSelectOpenListbox: FC = () => {
	const [searchParams] = useSearchParams();
	const openListbox = searchParams.get('open-listbox') as string;
	const ref = useRef<HTMLKolSingleSelectElement>(null);

	useEffect(() => {
		if (openListbox !== 'true') {
			return;
		}
		/*
		 * The shadow DOM builds asynchronously, so the input may not exist when the effect runs; poll
		 * until it does. Firing the input event opens the listbox the way user typing does, which lets
		 * the visual tests photograph it in its open state.
		 */
		let tries = 0;
		const fire = (): void => {
			const input = ref.current?.shadowRoot?.querySelector('input');
			if (input) {
				input.dispatchEvent(new Event('input', { bubbles: true }));
			} else if (tries++ < 600) {
				requestAnimationFrame(fire);
			}
		};
		fire();
	}, [openListbox]);

	return (
		<>
			<SampleDescription>
				<p>
					Shows a SingleSelect in a narrow container with long option labels. The open listbox grows with its widest option, is at least as wide as the field
					and never wider than 90% of the viewport.
				</p>
			</SampleDescription>

			<div style={{ width: '12rem' }}>
				<KolSingleSelect
					ref={ref}
					_label="Authority"
					_options={[
						{ label: 'Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz', value: 'rindfleisch' },
						{ label: 'Brandenburgisches Landesamt für Denkmalpflege und Archäologisches Landesmuseum', value: 'bldam' },
						{ label: 'Kraftfahrzeug-Haftpflichtversicherung', value: 'kfv' },
						{ label: 'Short', value: 'short' },
					]}
				/>
			</div>
		</>
	);
};
