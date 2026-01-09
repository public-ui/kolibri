import { execSync } from 'child_process';
import { PackageManagerCommand, getPackageManagerCommand } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export class HandleDependencyTask extends AbstractTask {
	protected constructor(
		identifier: string,
		title: string,
		private readonly command: PackageManagerCommand,
		private readonly dependencies: Record<string, string>, // Map<string, string | null>
		private readonly devDependencies: Record<string, string>, // Map<string, string | null>
		versionRange: string,
		dependentTasks?: AbstractTask[],
		options?: TaskOptions,
	) {
		super(identifier, title, [], versionRange, dependentTasks, options);
	}

	public static getInstance(
		command: PackageManagerCommand,
		dependencies: Record<string, string>,
		devDependencies: Record<string, string>,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): HandleDependencyTask {
		const identifier = `${command}-${Object.keys(dependencies ?? {}).join(',')}-${Object.keys(devDependencies ?? {}).join(',')}`;
		const title = `${command === 'add' ? 'Add' : command === 'install' ? 'Install' : 'Remove'} dependency "${Object.keys(dependencies ?? {}).join(
			', ',
		)}" and devDependency "${Object.keys(devDependencies ?? {}).join(', ')}".`;
		if (!this.instances.has(identifier)) {
			this.instances.set(
				identifier,
				new HandleDependencyTask(identifier, title, command, dependencies, devDependencies, versionRange, dependentTasks, options),
			);
		}
		return this.instances.get(identifier) as HandleDependencyTask;
	}

	/**
	 * Collect dependency commands to be executed in batch mode.
	 * Does NOT execute immediately - returns commands for aggregation.
	 */
	public prepareExecutables(): string[] {
		const commands: string[] = [];

		if (Object.keys(this.dependencies ?? {}).length > 0) {
			let command = `${getPackageManagerCommand(this.command)}`;
			Object.keys(this.dependencies ?? {}).forEach((dependency) => {
				command += ` ${dependency}@${this.dependencies[dependency]}`;
			});
			commands.push(command);
		}

		if (Object.keys(this.devDependencies ?? {}).length > 0) {
			let command = `${getPackageManagerCommand(this.command)} -D`;
			Object.keys(this.devDependencies ?? {}).forEach((dependency) => {
				command += ` ${dependency}`;
			});
			commands.push(command);
		}

		return commands;
	}

	public run(): void {
		// In batch mode, commands are collected and executed later
		// This method is kept for backward compatibility but does nothing
		// Actual execution happens in TaskRunner with aggregated commands
	}

	/**
	 * Execute collected commands immediately (used for backward compatibility).
	 */
	public executeImmediate(): void {
		const commands = this.prepareExecutables();
		commands.forEach((command) => {
			try {
				execSync(command, {
					encoding: 'utf8',
				});
			} catch (error) {
				console.warn(error);
			}
		});
	}
}
