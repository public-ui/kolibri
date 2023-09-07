import { getVersionOfPublicUiComponents } from '../../../shares/reuse';
import { AbstractTask } from '../../abstract-task';
import { TestVersion13 } from './test-version-1.3';
import { TestVersionCurrent } from './test-version-current';
import { TestVersionNext2 } from './test-version-next-2';
import { TestVersionNext3 } from './test-version-next-3';
import { TestVersionZero } from './test-version-zero';

export const testTasks: AbstractTask[] = [];
testTasks.push(TestVersionZero.getInstance());
testTasks.push(TestVersionNext2.getInstance());
testTasks.push(TestVersionNext3.getInstance());
testTasks.push(TestVersion13.getInstance());

const versionOfPublicUiComponents = getVersionOfPublicUiComponents();
testTasks.push(TestVersionCurrent.getInstance(versionOfPublicUiComponents));
