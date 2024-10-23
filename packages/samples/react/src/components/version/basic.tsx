import type { FC } from 'react';
import React from 'react';
import { KolInputDate, KolInputText } from '@public-ui/react';

export const VersionBasic: FC = () => {
	return (
		<div>
			<b>text:</b>

			<KolInputText
				_label="text"
				onBlur={(e) => {
					console.log('blur', e);
				}}
				onChange={(e) => {
					console.log('change', e.target.value!, typeof e.target.value!);
				}}
				onFocus={(e) => {
					console.log('focus', e);
				}}
				onClick={(e) => {
					console.log('click', e);
				}}
				onInput={(e) => {
					console.log('input', e.target.value!, typeof e.target.value!);
				}}
			></KolInputText>

			<b>date:</b>

			<KolInputDate
				_label="date"
				_value={new Date()}
				onBlur={(e) => {
					console.log('blur', e);
				}}
				onChange={(e) => {
					console.log('change', e.target.value!, typeof e.target.value!);
				}}
				onFocus={(e) => {
					console.log('focus', e);
				}}
				onClick={(e) => {
					console.log('click', e);
				}}
				onInput={(e) => {
					console.log('input', e.target.value!, typeof e.target.value!);
				}}
			></KolInputDate>
		</div>
	);
};
