import semver from 'semver';
import { FILE_EXTENSIONS, FileExtension } from '../../types';
import { TaskStatus } from './types';

export type TaskOptions = {
	dependentTasks?: AbstractTask[];
	description?: string;
};

export abstract class AbstractTask {
	private status: TaskStatus = 'pending';

	protected static instance?: AbstractTask;

	protected readonly description?: string;

	protected constructor(
		protected readonly identifier: string,
		protected readonly title: string,
		protected readonly extensions: FileExtension[],
		protected readonly versionRange: string,
		protected readonly dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		this.description = options.description;
		this.extensions = this.extensions.filter((ext) => FILE_EXTENSIONS.includes(ext));

		if (!semver.validRange(this.versionRange)) {
			throw new Error(`[${this.identifier}] Invalid semver range version: ${this.versionRange}`);
		}
	}

	public getDependentTasks(): AbstractTask[] {
		return this.dependentTasks;
	}

	public getDescription(): string | undefined {
		return this.description;
	}

	public getIdentifier(): string {
		return this.identifier;
	}

	public setStatus(status: TaskStatus): void {
		this.status = status;
	}

	public getStatus(): TaskStatus {
		return this.status;
	}

	public getTitle(): string {
		return this.title;
	}

	public getVersionRange(): string {
		return this.versionRange;
	}

	protected runDummy(files: string[]): void {
		files.forEach(() => {
			// let content: string = fs.readFileSync(file, 'utf8');
			// content = content.replace(/_heading="([^"]+)"/g, '_label="$1"');
			// fs.writeFileSync(file, content);
		});
	}

	public abstract run(baseDir: string): void;
}
