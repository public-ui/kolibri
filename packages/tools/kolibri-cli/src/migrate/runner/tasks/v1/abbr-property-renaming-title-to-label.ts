import { ReplacePropertyNameTask } from '../common/ReplacePropertyNameTask';

export class AbbrPropertyRenamingTitleToLabel extends ReplacePropertyNameTask {
	public static getInstance(): ReplacePropertyNameTask {
		return super.getInstance('abbr-property-renaming-title-to-label', '>=1 <2', 'kol-abbr', '_title', '_label');
	}
}
