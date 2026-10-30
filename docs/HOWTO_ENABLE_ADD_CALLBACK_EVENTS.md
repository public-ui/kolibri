# Enabling/Adding of Callback Events for Components

To add a new Callback Event to an existing component you need to go through these steps:
For this HowTo we will take the dialog-component as example.

## Adding the Callback Event to Component Props

The callback events available for the component are defined within [dialog.ts](../packages/components/src/schema/types/dialog.ts) or in our case more precisely [modal.ts](../packages/components/src/schema/types/modal.ts).
If you wish to add a new, within [KolEvent](../packages/components/src/utils/events.ts) existing events, you need to define it there.
If your desired event already exists here you can move on.

## Enable the Component to be able to trigger the callback

The triggerable events for each component are defined within its own callback file. So to enable the possibility of triggering the event for that specific component that event needs to be added here.
E.g. [dialog-callbacks.ts](../packages/components/src/internal/props/dialog-callbacks.ts)

## Ensure Quality through adding/adjusting tests

### Add the new callback event to callback tests

To ensure there are neither more nor fewer callback events than desired, each components callback events existence is being tested.
Consequently any new callback events need to be added within these tests.
[callback-props.spec.ts](../packages/components/src/internal/props/callback-props.spec.ts).

### Adding e2e test for the component

In addition, e2e tests are performed to verify that the behavior of each individual event functions as intended.
Therefore, these tests must be adjusted if the behavior changes.
E.g. [dialog.e2e.ts](../packages/components/src/components/dialog/dialog.e2e.ts)

## Adjusting the component itself

Finally, the component must be able to handle these events, this requires a modification to the component. You can either extend the behavior using an existing event handler or create a completely new one.
E.g. [Dialog Component](../packages/components/src/components/dialog/base.tsx)
Keep in mind that you might have to restrict/enable that event from bubbling through the elements.

## Creating a new sample or adjusting existing ones

For explanatory purposes, it is recommended to add a new sample or modify existing ones to illustrate the new behavior of this component.
E.g. [Dialog Samples](../packages/samples/react/src/components/dialog)
