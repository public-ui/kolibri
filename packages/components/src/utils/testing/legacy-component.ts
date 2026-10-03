import type { Generic } from 'adopted-style-sheets';

let stubCount = 0;

/**
 * Creates a host stub for the legacy watch helpers of `schema/utils/prop.validators.ts`.
 *
 * `devHint` logs a message only once per module instance, and the constructor name of the host is
 * part of the invalid-value warning. Every stub therefore gets a unique constructor name, so the
 * warning of each test stays observable.
 */
export const createLegacyComponent = (state: Record<string, unknown> = {}): Generic.Element.Component => {
	stubCount += 1;
	const LegacyComponentStub = class implements Generic.Element.Component {
		public state: Record<string, unknown> = { ...state };
	};
	Object.defineProperty(LegacyComponentStub, 'name', { value: `LegacyComponentStub${stubCount}` });
	return new LegacyComponentStub();
};

/**
 * Returns the text of every logged message. The hint helpers log an array whose first entry is the
 * message; the logger itself is called with plain values as well.
 */
export const getLoggedMessages = (calls: unknown[][]): string[] => calls.map(([message]) => String(Array.isArray(message) ? message[0] : message));

/**
 * Returns the invalid-value warnings that `watchValidator` logged for `propName`.
 */
export const getInvalidValueWarnings = (calls: unknown[][], propName: string): string[] =>
	getLoggedMessages(calls).filter((message) => message.includes(`for '${propName}' is not valid`));
