import { AbstractTask } from '../../abstract-task';
import { RemovePropertyNameTask } from '../common/RemovePropertyNameTask';

export const NavRemovePropertyOrientationTask: AbstractTask = RemovePropertyNameTask.getInstance('kol-nav', '_orientation', '^4');
