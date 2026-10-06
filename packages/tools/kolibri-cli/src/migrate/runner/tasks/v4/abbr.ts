import { AbstractTask } from '../../abstract-task';
import { MoveTextContentToPropertyTask } from '../common/MoveTextContentToPropertyTask';
import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';

/**
 * Before 4.5, `_label` of `kol-abbr` had no function. From 4.5 it is the long form, so the task must
 * not run for projects on 4.5 or later.
 */
export const RemoveAbbrLabelPropTask: AbstractTask = RemovePropertyNameTask.getInstance('kol-abbr', '_label', '>=4.0.0-0 <4.5.0-0');

/** The default slot of `kol-abbr` is deprecated in favor of `_abbr`. */
export const MoveAbbrTextContentToAbbrPropTask: AbstractTask = MoveTextContentToPropertyTask.getInstance('kol-abbr', '_abbr', '^4.5.0-0', [
	RemoveAbbrLabelPropTask,
]);
