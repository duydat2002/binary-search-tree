declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type Nullable<T> = T | null;

declare interface DOMEvent<T = EventTarget> extends Event {
  readonly target: T;
}
