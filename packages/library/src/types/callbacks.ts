type Callback<T> = (event: T) => void;
export type EventCallback<E extends Event> = Callback<E>;
export type EventValueCallback<E extends Event, V> = (event: E, value: V) => void;
