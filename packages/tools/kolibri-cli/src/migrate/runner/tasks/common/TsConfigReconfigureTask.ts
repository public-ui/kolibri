import { logAndCreateError } from '../../../shares/reuse';
import { AbstractTask, TaskOptions } from '../../abstract-task';

export class TsConfigReconfigureTask extends AbstractTask {
	private constructor(
		identifier: string,
		private readonly key: string,
		private readonly config: Record<string, unknown>,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	) {
		super(identifier, `Reconfigure "${key}" in tsconfig.json of your project.`, [], versionRange, dependentTasks, options);

		if (typeof key !== 'string') {
			throw logAndCreateError(`Key of task "${this.identifier}" is not a string.`);
		}

		try {
			JSON.stringify(config);
		} catch {
			throw logAndCreateError(`Value of task "${this.identifier}" is not able to stringify (JSON).`);
		}
	}

	public static getInstance(
		key: string,
		value: Record<string, unknown>,
		versionRange: string,
		dependentTasks: AbstractTask[] = [],
		options: TaskOptions = {},
	): TsConfigReconfigureTask {
		const identifier = `tsconfig-reconfigure-${key}`;
		if (!this.instances.has(identifier)) {
			this.instances.set(identifier, new TsConfigReconfigureTask(identifier, key, value, versionRange, dependentTasks, options));
		}
		return this.instances.get(identifier) as TsConfigReconfigureTask;
	}

	public run(): void {
		/**
		 * The tsconfig.json shows an error, if we add `@public-ui/components` to the `types` property list.
		 */
		// const configPath = path.join(process.cwd(), 'tsconfig.json');
		// if (fs.existsSync(configPath)) {
		// 	try {
		// 		const fileContent = merge(JSON.parse(fs.readFileSync(configPath, 'utf8')) as Record<string, unknown>, this.config);
		// 		fs.writeFileSync(configPath, JSON.stringify(fileContent, null, 2));
		// 		MODIFIED_FILES.add(configPath);
		// 	} catch (e) {
		// 		// empty
		// 	}
		// }
	}
}
