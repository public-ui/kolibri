// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TASK_STATUS = ['pending', 'running', 'done', 'failed', 'skipped'] as const;
export type TaskStatus = (typeof TASK_STATUS)[number];
