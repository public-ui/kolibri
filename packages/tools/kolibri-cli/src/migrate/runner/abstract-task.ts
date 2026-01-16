import semver from 'semver';

import { FILE_EXTENSIONS, FileExtension } from '../../types';
import { logAndCreateError } from '../shares/reuse';
import { TaskStatus } from './types';

export type TaskOptions = {
	taskDependencies?: AbstractTask[];
	description?: string;
};

export type ExecutionMode = 'batch' | 'immediate';

export abstract class AbstractTask {
	private status: TaskStatus = 'pending';
	protected executionMode: ExecutionMode = 'immediate';
	protected pendingExecutables: string[] = [];

	protected static readonly instances: Map<string, AbstractTask> = new Map();

	protected readonly description?: string;

	protected constructor(
		protected readonly identifier: string,
		protected readonly title: string,
		protected readonly extensions: FileExtension[],
		protected readonly versionRange: string,
		protected readonly taskDependencies: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		this.description = options.description;
		this.extensions = this.extensions.filter((ext) => FILE_EXTENSIONS.includes(ext));

		if (!semver.validRange(this.versionRange)) {
			throw logAndCreateError(`[${this.identifier}] Invalid semver range version: ${this.versionRange}`);
		}
	}

	public getTaskDependencies(): AbstractTask[] {
		return this.taskDependencies;
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

	public setExecutionMode(mode: ExecutionMode): void {
		this.executionMode = mode;
	}

	public getExecutionMode(): ExecutionMode {
		return this.executionMode;
	}

	public getPendingExecutables(): string[] {
		return this.pendingExecutables;
	}

	public clearPendingExecutables(): void {
		this.pendingExecutables = [];
	}

	public abstract run(baseDir: string): void;
}
