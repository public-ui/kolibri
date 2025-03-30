import { ToasterService } from '@public-ui/components';
import { KolInputFile } from '@public-ui/react';
import { renderAsync } from 'docx-preview';
import React, { useRef, useState } from 'react';
import { SampleDescription } from '../components/SampleDescription';

const DOCX_PREVIEW_ERROR = 'The file could not be displayed. It may be damaged or not a valid .docx document.';

export const DocxPreview = () => {
	const [files, setFiles] = useState<File[]>([]);
	const previewRef = useRef<HTMLDivElement>(null);
	const toaster = ToasterService.getInstance(document);

	const errorToast = (msg: string) => {
		void toaster.enqueue({
			description: msg,
			label: `Error occurred`,
			type: 'warning',
		});
	};

	const onChange = {
		onChange: async (_e: Event, v: unknown) => {
			const fileList = v as FileList;
			if (Array.isArray(fileList) || fileList.length === 1) {
				setFiles(Array.from(fileList));
				const file = fileList[0];
				if (previewRef.current) {
					previewRef.current.innerHTML = '';
					try {
						await renderAsync(await file.arrayBuffer(), previewRef.current);
					} catch (e) {
						previewRef.current.innerHTML = `<p class="text-red-600 text-center">${DOCX_PREVIEW_ERROR}</p>`;
						errorToast(DOCX_PREVIEW_ERROR);
					}
				}
			}
		},
	};

	return (
		<>
			<SampleDescription>
				<p>This component showcases how to preview `.docx` files directly in the browser using the `docx-preview` library.</p>
			</SampleDescription>
			<KolInputFile _label="Select file" _accept=".docx,.odt,.pdf" _on={onChange} />
			<ul>
				{files.map((file) => (
					<li key={`file-${file.name}-${file.size}`}>
						{file.name} – {(file.size / 1024).toFixed(1)} KB
					</li>
				))}
			</ul>
			{/* The preview area is not usable and visible for users with screenreader. */}
			<div aria-hidden="true" onClick={(event) => event.preventDefault()}>
				<div className="docx-preview border-dashed border bg-gray-1 p-4 overflow-scroll h-300px rounded" ref={previewRef} />
				<p className="text-xs px-2">Note: The preview is not interactive. You can only scroll and select text.</p>
			</div>
		</>
	);
};
