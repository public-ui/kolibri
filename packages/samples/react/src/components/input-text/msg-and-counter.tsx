import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

/**
 * Sample to manually verify fix for #9073:
 * aria-describedby must contain both the msg ID and the counter ID
 * when _msg and _hasCounter are set simultaneously.
 *
 * To verify: inspect each input's aria-describedby in DevTools.
 * Expected: aria-describedby contains both "...-msg" and "...-counter".
 */
export const InputTextMsgAndCounter: FC = () => (
	<>
		<SampleDescription>
			<p>
				Regression sample for <a href="https://github.com/public-ui/kolibri/issues/9073">#9073</a>: when both{' '}
				<code>_msg</code> and <code>_hasCounter</code> are set, the input's <code>aria-describedby</code> must
				reference both the message element (<code>…-msg</code>) and the counter element (<code>…-counter</code>
				).
			</p>
			<p>
				Open DevTools and inspect each input to confirm <code>aria-describedby</code> contains both IDs.
			</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolInputText
				_label="Warning + Counter"
				_msg={{ _type: 'warning', _description: 'Bitte prüfen Sie Ihre Eingabe.' }}
				_hasCounter
				_maxLength={30}
			/>
			<KolInputText
				_label="Error + Counter (touched)"
				_msg={{ _type: 'error', _description: 'Pflichtfeld – bitte ausfüllen.' }}
				_hasCounter
				_maxLength={30}
				_touched
			/>
			<KolInputText
				_label="Info + Counter"
				_msg={{ _type: 'info', _description: 'Hinweis: maximal 20 Zeichen.' }}
				_hasCounter
				_maxLength={20}
			/>
		</div>
	</>
);
