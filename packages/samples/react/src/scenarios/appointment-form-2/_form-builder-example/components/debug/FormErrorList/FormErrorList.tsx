import * as React from 'react';
import type { ErrorListPropType } from '@public-ui/components';
import { KolAlert, KolLink } from '@public-ui/react';
import { useFormikContext } from 'formik';
import { useSectionSubmitted } from '../../../providers';
import { useFieldIdBuilder } from '../../../hooks';

function FormErrorList(_: unknown, ref: React.ForwardedRef<{ focus: () => void }>) {
	const errorListElementRef = React.useRef<HTMLUListElement>(null);
	const { sectionSubmitted } = useSectionSubmitted();
	const { buildFieldIdSelector } = useFieldIdBuilder();
	const { errors } = useFormikContext();

	React.useImperativeHandle(ref, () => ({
		focus: () => {
			if (!errorListElementRef.current) {
				return;
			}

			const firstChild = errorListElementRef.current.firstChild?.firstChild as HTMLKolLinkElement;
			firstChild?.kolFocus();
		},
	}));

	const createErrorList = React.useCallback((formikErrors: Record<string, string>): ErrorListPropType[] => {
		const values = Object.keys(formikErrors).map((fieldName) => ({
			message: formikErrors[fieldName],
			selector: buildFieldIdSelector(fieldName),
		}));

		return values;
	}, []);

	const handleLinkClick = React.useCallback((event: Event) => {
		const href = (event.target as HTMLAnchorElement | undefined)?.href;
		if (href) {
			const hrefUrl = new URL(href);

			const targetElement = document.querySelector<HTMLElement>(hrefUrl.hash);
			if (targetElement && typeof targetElement.focus === 'function') {
				targetElement.scrollIntoView({ behavior: 'smooth' });
				targetElement.focus();
			}
		}
	}, []);

	if (!sectionSubmitted || !errors) {
		return null;
	}

	const errorList = createErrorList(errors);

	if (!errorList?.length) {
		return null;
	}

	return (
		<KolAlert _type="error">
			Please correct the following errors
			<nav aria-label="error list">
				<ul ref={errorListElementRef}>
					{errorList.map((error, index) => (
						<li key={index}>
							<KolLink _href={error.selector} _label={error.message} _on={{ onClick: handleLinkClick }} />
						</li>
					))}
				</ul>
			</nav>
		</KolAlert>
	);
}

export default React.forwardRef(FormErrorList);
