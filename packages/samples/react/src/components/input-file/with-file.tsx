import { KolInputFile } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';

import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

const FIRST_FILE_NAME = 'rechnung-antragsunterlagen-einkommensnachweis-mit-einem-absichtlich-sehr-langen-dateinamen.pdf';
const SECOND_FILE_NAME = 'anlage-vermoegensaufstellung-2026-mit-den-ebenen-aller-gesellschafter-und-beteiligungen.pdf';

/**
 * There is no public API to preselect files, so the sample sets them on the native input inside
 * the shadow root and dispatches `change`, like a selection in the file dialog would. The retry
 * bridges the frames until the custom element has rendered its shadow content.
 */
function usePreselectedFiles(ref: React.RefObject<HTMLKolInputFileElement | null>, fileNames: string[]): void {
	useEffect(() => {
		let frames = 0;
		const tick = () => {
			const input = ref.current?.shadowRoot?.querySelector<HTMLInputElement>('input.kol-input');
			if (input) {
				const transfer = new DataTransfer();
				for (const name of fileNames) {
					transfer.items.add(new File(['preselected for the snapshot'], name, { type: 'application/pdf' }));
				}
				input.files = transfer.files;
				input.dispatchEvent(new Event('change', { bubbles: true }));
			} else if (++frames < 30) {
				requestAnimationFrame(tick);
			}
		};
		requestAnimationFrame(tick);
	}, [fileNames, ref]);
}

export const InputFileWithFile: FC = () => {
	const singleRef = useRef<HTMLKolInputFileElement>(null);
	const multipleRef = useRef<HTMLKolInputFileElement>(null);
	usePreselectedFiles(singleRef, [FIRST_FILE_NAME]);
	usePreselectedFiles(multipleRef, [FIRST_FILE_NAME, SECOND_FILE_NAME]);

	return (
		<>
			<SampleDescription>
				<p>Preselects files with very long names, so the snapshots pin the wrapping of the file name and the browse button growing with the field.</p>
			</SampleDescription>
			<SampleBlock id="long-name" narrow>
				<KolInputFile ref={singleRef} _label="Upload file" />
			</SampleBlock>
			<SampleBlock id="long-names-multiple" narrow>
				<KolInputFile ref={multipleRef} _label="Upload files" _multiple />
			</SampleBlock>
		</>
	);
};
