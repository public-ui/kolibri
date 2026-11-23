import { KolButtonLinkTag } from '../../core/component-names';
import { executeSnapshotTests } from '../../utils/testing';

import { KolButtonLink } from './component';

executeSnapshotTests(KolButtonLinkTag, [KolButtonLink], [{ _label: 'Beschreibung' }, { _label: [{ text: 'partly english', lang: 'en' }, { text: ' Label' }] }]);
