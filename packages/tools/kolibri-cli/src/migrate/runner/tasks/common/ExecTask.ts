import { execSync } from 'child_process';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export class ExecTask extends AbstractTask {
	protected constructor(
		identifier: string,
		title: string,
		private readonly command: string,
		versionRange: string,
		dependentTasks?: AbstractTask[],
		options?: TaskOptions,
	) {
		super(identifier, title, [], versionRange, dependentTasks, options);
	}

	public static getInstance(command: string, versionRange: string, dependentTasks: AbstractTask[] = [], options: TaskOptions = {}): ExecTask {
		const identifier = `exec-${command}`;
		const title = `Exec ${command}.`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new ExecTask(identifier, title, command, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as ExecTask;
	}

	/**
	 * Prepares the command with package manager specific flags.
	 * For pnpm install, adds --ignore-lockfile to resolve dependency conflicts during migration.
	 * @private
	 */
	private prepareCommand(command: string): string {
		// Add --ignore-lockfile for pnpm install to ensure dependency resolution during migration
		if (command.includes('pnpm install')) {
			return `${command} --ignore-lockfile`;
		}
		return command;
	}

	public run(): void {
		try {
			const preparedCommand = this.prepareCommand(this.command);
			execSync(preparedCommand, {
				encoding: 'utf8',
			});
		} catch (error) {
			console.warn(error);
		}
	}
}
