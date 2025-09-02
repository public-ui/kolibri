# Toaster

The Toaster service enqueues toast notifications.

## Options

- `defaultVariant`: Sets the fallback `variant` for toasts when none is specified.

## Migration to v3

- The toast property `alertVariant` was removed. Use `variant` instead.
- The options property `defaultAlertType` was renamed to `defaultVariant`.
