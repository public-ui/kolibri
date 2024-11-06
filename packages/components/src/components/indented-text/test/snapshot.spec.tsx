import { KolIndentedTextTag } from '@component-names';
import type { IndentedTextProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolIndentedText } from '../shadow';
import { KolIndentedTextWc } from '../component';

executeSnapshotTests<IndentedTextProps>(KolIndentedTextTag, [KolIndentedText, KolIndentedTextWc], [{}]);
