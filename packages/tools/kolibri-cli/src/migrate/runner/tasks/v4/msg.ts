import { AbstractTask } from '../../abstract-task';
import { RemoveMsgPropsTask } from '../common/RemoveMsgPropsTask';

export const RemoveMsgPropsTasks: AbstractTask[] = [RemoveMsgPropsTask.getInstance('^4')];
