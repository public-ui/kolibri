import { getVersionOfPublicUiComponents } from '../../../shares/reuse';
import { AbstractTask } from '../../abstract-task';
import { TestVersion13 } from './test-version-1.3';
import { TestVersionCurrent } from './test-version-current';
import { TestVersionNext99 } from './test-version-next-99';
import { TestVersionZero } from './test-version-zero';

export const testTasks: AbstractTask[] = [];
testTasks.push(TestVersionZero.getInstance());
testTasks.push(TestVersionNext99.getInstance());
testTasks.push(TestVersion13.getInstance());

const versionOfPublicUiComponents = getVersionOfPublicUiComponents();
testTasks.push(TestVersionCurrent.getInstance(versionOfPublicUiComponents));
