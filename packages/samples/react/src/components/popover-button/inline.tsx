import { KolHeading, KolPopoverButton } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const PopoverButtonInline: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>
					A PopoverButton inline with some dummy text. Here the PopoverButton has the height of the surrounding text. As statet in
					<a href="https://www.w3.org/WAI/WCAG21/Understanding/target-size.html">Understanding SC 2.5.5</a> target size of a help icon in text can be smaller
					than 44px by 44px.
				</p>
			</SampleDescription>
			<div className="flex flex-col gap-4">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut dolore dolores itaque praesentium reprehenderit sed voluptatum!
					Exercitationem ipsa magni maiores modi, placeat quas quos reprehenderit rerum sit veniam vitae.
                                        <KolPopoverButton _inline _label="Help" _icons="codicon codicon-question" _popoverAlign="right" _tooltipAlign="bottom" _hideLabel>
						<div className="w-sm p-2 border border-solid border-gray">
							<KolHeading _label="Help Information" _level={0}></KolHeading>
							<p>
								<u>Lorem ipsum dolor sit amet</u>, consectetur adipisicing elit. Aspernatur aut dolore dolores itaque praesentium reprehenderit sed voluptatum!
								Exercitationem ipsa magni maiores modi, placeat quas quos reprehenderit rerum sit veniam vitae.
							</p>
						</div>
					</KolPopoverButton>
					<br />
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur aut dolore dolores itaque praesentium reprehenderit sed voluptatum!
					Exercitationem ipsa magni maiores modi, placeat quas quos reprehenderit rerum sit veniam vitae.
				</p>
			</div>
		</>
	);
};
