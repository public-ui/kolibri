import type { Generic } from 'adopted-style-sheets';
import type { PropAriaLabelledby, PropLabel, PropTableCallbacks, PropTableData, PropTableDataFoot, PropTableSelection } from '../props';
import type { PropHasSettingsMenu } from '../props/has-settings-menu';
import type { Stringified } from '../types';
import type { KoliBriTableHeaders } from './table';

type RequiredProps = PropLabel & PropTableData;

type OptionalProps = {
	loading: boolean;
	headers: Stringified<KoliBriTableHeaders>; // required sobald headerCells entfernt
} & PropAriaLabelledby &
	PropTableCallbacks &
	PropTableDataFoot &
	PropTableSelection &
	PropHasSettingsMenu;

export type TableStatelessProps = Generic.Element.Members<RequiredProps, OptionalProps>;
