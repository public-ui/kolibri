import * as React from 'react';

type SectionSubmittedContextType = {
	sectionSubmitted: boolean;
	setSectionSubmitted: (value: boolean) => void;
};

const SectionSubmittedContext = React.createContext<SectionSubmittedContextType>({
	sectionSubmitted: false,
	setSectionSubmitted: () => {},
});

export function useSectionSubmitted(): SectionSubmittedContextType {
	const ctx = React.useContext(SectionSubmittedContext);
	return ctx;
}

function SectionSubmittedProvider({ sectionSubmitted: initialSectionSubmitted = false, children }: React.PropsWithChildren<{ sectionSubmitted?: boolean }>) {
	const [sectionSubmitted, setSectionSubmitted] = React.useState(initialSectionSubmitted);

	React.useLayoutEffect(() => {
		setSectionSubmitted(sectionSubmitted);
	}, [initialSectionSubmitted]);

	return <SectionSubmittedContext.Provider value={{ sectionSubmitted, setSectionSubmitted }}>{children}</SectionSubmittedContext.Provider>;
}

export default SectionSubmittedProvider;
