import type { FC } from 'react';
import React from 'react';
import { KolInputText, KolPopoverButton, KolHeading } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { FormWrap } from '../FormWrap';

const InputTextVariants = <></>;
export const ToolbarBasic: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>
					This example shows how tooltips in KolPopoverButton and KolInputText behave inside different container contexts using container queries. It compares
					three setups: a standard container layout, a media-specific layout, and a layout with potential shifts caused by container-query behavior.
				</p>
			</SampleDescription>
			<FormWrap RefComponent={InputTextVariants} />

			<KolHeading _label="Default layout container using standard grid." _level={2} />
			<div className="container-example-bottom">
				<div className="front-block" />
				<div className="container-container">
					<div className="container-grid">
						<KolInputText _label="container-text" _hideLabel />
						<KolPopoverButton _label="icon-only with tooltip" _icons="codicon codicon-info" _tooltipAlign="right" _hideLabel>
							This is an explanation shown on click.
						</KolPopoverButton>{' '}
					</div>
				</div>
			</div>

			<KolHeading _label="Media-specific layout using different container styles." _level={2} />
			<div className="media-container">
				<div className="media-grid">
					<KolInputText _label="media-text" _hideLabel />
					<KolPopoverButton _label="icon-only with tooltip" _icons="codicon codicon-info" _tooltipAlign="right" _hideLabel>
						This is an explanation shown on click.
					</KolPopoverButton>
				</div>
			</div>

			<KolHeading _label=" Layout with container queries and potential layout shifts." _level={2} />
			<div className="container-example-bottom">
				<div className="front-block" />
				<div className="container-container-bottom">
					<div className="container-grid">
						<KolInputText _label="container-text-bottom" _hideLabel />
						<KolPopoverButton _label="icon-only with tooltip" _icons="codicon codicon-info" _tooltipAlign="right" _hideLabel>
							This is an explanation shown on click.
						</KolPopoverButton>
					</div>
				</div>
			</div>
		</>
	);
};
