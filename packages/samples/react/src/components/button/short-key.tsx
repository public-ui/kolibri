import { KolAlert, KolButton, KolHeading, KolLink } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { SampleDescription } from '../SampleDescription';

export const ButtonShortKey: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	// The short key announced via `_shortKey` is purely visual/assistive – it does NOT
	// wire up a keyboard handler. The example below shows how to make it interactive by
	// registering a matching `keydown` listener yourself.
	const interactiveShortKey = 'm';
	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.altKey && event.key.toLowerCase() === interactiveShortKey) {
				event.preventDefault();
				dummyClickEventHandler();
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [dummyClickEventHandler]);

	return (
		<>
			<SampleDescription>
				<p>
					This story demonstrates buttons with short keys. The short key is displayed as a visual indicator within the button label to communicate a recommended
					keyboard shortcut to the user.
				</p>
			</SampleDescription>

			<KolAlert _label="Short keys are display-only" _type="info" _variant="card">
				<p>
					<code>_shortKey</code> is <strong>purely visual and assistive</strong>: it renders the badge and announces the shortcut via{' '}
					<code>aria-keyshortcuts</code>, but it does <strong>not</strong> bind a keyboard handler. Pressing the displayed combination on its own does nothing –
					you have to register the listener yourself (see the interactive example below).
				</p>
				<p>
					If you need a native, browser-handled shortcut instead, use{' '}
					<KolLink _label="_accessKey" _href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey" _target="blank" />. Note that native
					access keys are triggered in a browser-specific way (e.g. <kbd>Alt</kbd> + <kbd>Shift</kbd> + key in Chrome on Windows).
				</p>
			</KolAlert>

			<div className="grid gap-8">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Buttons with Short Keys" />
					<div className="flex flex-wrap gap-4">
						<KolButton _label="With S short key" _shortKey="S" _on={dummyEventHandler} />
						<KolButton _label="Very small b" _shortKey="b" _on={dummyEventHandler} />
						<KolButton _label="Short key does not appear in label" _shortKey="x" _on={dummyEventHandler} />
					</div>
				</section>

				<section className="grid gap-4">
					<KolHeading _level={2} _label="Short Key with Hidden Label" />
					<div className="flex flex-wrap gap-4">
						<KolButton _label="short key without label" _hideLabel _shortKey="k" _icons="kolicon-cogwheel" _on={dummyEventHandler} />
					</div>
				</section>

				<section className="grid gap-4">
					<KolHeading _level={2} _label="Short Key with Inline Icons" />
					<div className="flex flex-wrap gap-4">
						<KolButton
							_label="with inline icons"
							_icons={{
								left: 'kolicon-cogwheel',
								right: 'kolicon-cogwheel',
							}}
							_shortKey="n"
							_on={dummyEventHandler}
						/>
					</div>
				</section>

				<section className="grid gap-4">
					<KolHeading _level={2} _label="Interactive Short Key" />
					<p>
						This button wires the announced short key up manually: a <code>keydown</code> listener triggers the same action as a click. Press <kbd>Alt</kbd> +{' '}
						<kbd>M</kbd> (or click the button) to open the toast.
					</p>
					<div className="flex flex-wrap gap-4">
						<KolButton _label="With working M short key" _shortKey={interactiveShortKey} _on={dummyEventHandler} />
					</div>
				</section>
			</div>
		</>
	);
};
