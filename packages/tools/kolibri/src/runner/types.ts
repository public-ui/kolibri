export const TASK_STATUS = ['pending', 'running', 'done', 'failed'] as const;
export type TaskStatus = (typeof TASK_STATUS)[number];
