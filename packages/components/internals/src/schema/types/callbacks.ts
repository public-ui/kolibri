type Callback<T> = (event: T) => void;
export type EventCallback<E extends Event> = Callback<E>;
type EventValueCallback<E extends Event, V> = (event: E, value: V) => void;
export type EventValueOrEventCallback<E extends Event, V> = EventValueCallback<E, V> | EventCallback<E>;
