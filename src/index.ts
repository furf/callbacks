type Callback<T> = (value: T) => void;
type Unsubscribe = () => void;

export default class Callbacks<T> {
  private callbacks = new Set<Callback<T>>();

  subscribe(callback: Callback<T>): Unsubscribe {
    this.callbacks.add(callback);
    return () => this.unsubscribe(callback);
  }

  publish(value: T) {
    for (const callback of this.callbacks) {
      callback(value);
    }
  }

  unsubscribe(callback: Callback<T>): boolean {
    return this.callbacks.delete(callback);
  }

  unsubscribeAll() {
    this.callbacks.clear();
  }
}
