import fs from 'fs';

import { FILE_EXTENSIONS, type FileExtension } from '../../../../types';
const fileExtensions: FileExtension[] = [...FILE_EXTENSIONS];
import { filterFilesByExt, MODIFIED_FILES } from '../../../shares/reuse';
import { AbstractTask } from '../../abstract-task';

class ToasterRenamePropertiesTask extends AbstractTask {
	private constructor() {
		super(
			'toaster-rename-properties',
			'Rename Toaster properties `alertVariant` to `variant` and `defaultAlertType` to `defaultVariant`',
			fileExtensions,
			'>=2 <4',
		);
	}

	public static getInstance(): ToasterRenamePropertiesTask {
		const identifier = 'toaster-rename-properties';
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new ToasterRenamePropertiesTask());
		}
		return this.instances.get(identifier) as ToasterRenamePropertiesTask;
	}

	public run(baseDir: string): void {
		filterFilesByExt(baseDir, fileExtensions).forEach((file) => {
			const content = fs.readFileSync(file, 'utf8');
			const newContent = content.replace(/alertVariant(?=\s*:)/g, 'variant').replace(/defaultAlertType(?=\s*:)/g, 'defaultVariant');
			if (content !== newContent) {
				MODIFIED_FILES.add(file);
				fs.writeFileSync(file, newContent);
			}
		});
	}
}

export const ToasterRenameProperties = ToasterRenamePropertiesTask.getInstance();
