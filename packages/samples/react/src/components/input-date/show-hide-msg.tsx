import { KolInputCheckbox, KolInputDate } from '@public-ui/react-v19';
import React, { useState } from 'react';
import { SampleDescription } from '../SampleDescription';

const msgTypes = ['default', 'error', 'info', 'success', 'warning'] as const;

function onGenerator(setter: (cb: (b: boolean) => boolean) => void) {
	return {
		onChange: () => setter((b) => !b),
	};
}

export const InputDateShowHideMsg = () => {
	const [showMsg, setShowMsg] = useState(true);
	const [isTouched, setIsTouched] = useState(true);
	const [hideMsg, setHideMsg] = useState(false);

	const onMsg = onGenerator(setShowMsg);
	const onTouched = onGenerator(setIsTouched);
	const onHideMsg = onGenerator(setHideMsg);

	return (
		<>
			<SampleDescription>
				<p>This example shows how messages work in input fields.</p>
			</SampleDescription>

			<div className="flex gap-4 flex-col">
				<div className="flex gap-4 items-center">
					<KolInputCheckbox _label="Toggle Msg" _on={onMsg} _checked={showMsg} _variant="button" />
					<KolInputCheckbox _label="Toggle Touched" _on={onTouched} _checked={isTouched} _variant="button" />
					<KolInputCheckbox _label="Toggle Hide Msg" _on={onHideMsg} _checked={hideMsg} _variant="button" />
				</div>
				<pre>
					Message exists: {showMsg ? 'Yes' : 'No'} (showMsg: {showMsg ? 'Yes' : 'No'})<br />
					Non-Error-Message visible: {showMsg && !hideMsg ? 'Yes' : 'No'} (showMsg: {showMsg ? 'Yes' : 'No'}, hideMsg: {hideMsg ? 'Yes' : 'No'})<br />
					Error-Message visible: {showMsg && isTouched && !hideMsg ? 'Yes' : 'No'} (showMsg: {showMsg ? 'Yes' : 'No'}, isTouched: {isTouched ? 'Yes' : 'No'},
					hideMsg: {hideMsg ? 'Yes' : 'No'})
				</pre>
				<KolInputDate _error={showMsg ? 'error message' : undefined} _hideError={hideMsg} _label="Date (_error)" _touched={isTouched} />
				{msgTypes.map((type) => (
					<KolInputDate
						key={type}
						_hideError={hideMsg}
						_label={`Date (_msg, ${type})`}
						_msg={
							showMsg
								? {
										_description: `${type} message`,
										_type: type,
									}
								: undefined
						}
						_touched={isTouched}
					/>
				))}
			</div>
		</>
	);
};
