import { executeSnapshotTests } from '../../../../../utils/testing';

import { KolClickButton } from '../component';

const KOL_CLICK_BUTTON_TAG = 'kol-click-button';

type ClickButtonSnapshotProps = {
	_label: string;
};

executeSnapshotTests<ClickButtonSnapshotProps>(KOL_CLICK_BUTTON_TAG, [KolClickButton], [{ _label: 'Click me' }, { _label: 'Submit form' }]);
