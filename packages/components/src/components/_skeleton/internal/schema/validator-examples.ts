/**
 * Demonstration der Validator-Lösung für das undefined-Problem.
 *
 * PROBLEM:
 * - Optionale Properties sollten undefined als gültigen Zustand erlauben
 * - Normalisierung sollte nicht automatisch undefined zu Defaults umwandeln
 * - Validierung sollte undefined für optionale Properties akzeptieren
 *
 * LÖSUNG:
 * - Separate Required/Optional Validator-Klassen
 * - Required: undefined wird zu Default normalisiert
 * - Optional: undefined bleibt undefined
 */

// Beispiel für Required vs Optional Behavior:

interface ComponentPropsExample {
	// Required: Muss einen Wert haben, niemals undefined
	name: string;

	// Optional: Kann undefined sein
	description?: string;

	// Optional mit default: Hat einen Fallback-Wert
	title?: string;
}

/**
 * Required Property Behavior:
 * - normalize(undefined) → defaultValue
 * - normalize('') → defaultValue
 * - validate('') → false (required!)
 * - validate(defaultValue) → true
 */

/**
 * Optional Property Behavior:
 * - normalize(undefined) → undefined
 * - normalize('') → undefined (empty string becomes undefined)
 * - validate(undefined) → true (optional!)
 * - validate('validString') → true
 */

// Korrekte Validator-Erstellung:
// const nameValidator = new RequiredStringValidator('DefaultName', 1);
// const descriptionValidator = new OptionalStringValidator(10, 200);

/**
 * In Component Controllern:
 */
/*
class ExampleController {
	public watchName(value?: string): void {
		// Required: undefined wird zu Default
		const processedName = nameValidator.process(value);
		this.setRenderPropsOrStates('name', processedName);
	}

	public watchDescription(value?: string): void {
		// Optional: undefined bleibt undefined
		const processedDescription = descriptionValidator.process(value);
		this.setRenderPropsOrStates('description', processedDescription);
	}
}
*/

export type { ComponentPropsExample };
