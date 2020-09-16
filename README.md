# Callbacks

A lightweight [publish-subscribe](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) library, written in [TypeScript](https://www.typescriptlang.org/).

Example usage:

```typescript
// Create a publisher instance.
const cb = new Callbacks<number>();

// Subscribe a callback.
function log(value) {
  console.log(value);
}

const unsubscribe = cb.subscribe(log);

// Publish an event.
cb.publish(42);

// Unsubscribe a callback.
cb.unsubscribe(log);

// Alternatively…
unsubscribe();

// Unsubscribe all callbacks.
cb.unsubscribeAll();
```
