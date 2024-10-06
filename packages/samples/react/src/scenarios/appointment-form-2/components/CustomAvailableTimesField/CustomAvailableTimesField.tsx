import * as React from 'react';

function CustomAvailableTimesField(_: unknown, ref: React.ForwardedRef<HTMLParagraphElement>) {
	return (
		<p ref={ref}>
			<em>For test purposes, only the dates for every half hour are available.</em>
		</p>
	);
}

export default React.forwardRef(CustomAvailableTimesField);
