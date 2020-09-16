import Callbacks from '.';

describe('Callbacks', () => {
  const TEST_STRING = 'I love Callbacks.';

  it('subscribes', () => {
    const cb = new Callbacks<string>();
    const mock1 = jest.fn();
    const mock2 = jest.fn();

    cb.subscribe(mock1);
    cb.subscribe(mock2);
    cb.publish(TEST_STRING);

    expect(mock1).toBeCalledWith(TEST_STRING);
    expect(mock2).toBeCalledWith(TEST_STRING);
  });

  it('subscribes once', () => {
    const cb = new Callbacks<string>();
    const mock = jest.fn();

    cb.subscribe(mock);
    cb.subscribe(mock);
    cb.publish(TEST_STRING);

    expect(mock).toBeCalledTimes(1);
  });

  it('unsubscribes', () => {
    const cb = new Callbacks<string>();
    const mock1 = jest.fn();
    const mock2 = jest.fn();

    cb.subscribe(mock1);
    cb.subscribe(mock2);
    cb.publish(TEST_STRING);
    cb.unsubscribe(mock1);
    cb.publish(TEST_STRING);
    cb.unsubscribe(mock2);
    cb.publish(TEST_STRING);

    expect(mock1).toBeCalledTimes(1);
    expect(mock2).toBeCalledTimes(2);
  });

  it('unsubscribes once', () => {
    const cb = new Callbacks<string>();
    const mock = jest.fn();

    cb.subscribe(mock);
    const t = cb.unsubscribe(mock);
    const f = cb.unsubscribe(mock);

    expect(t).toBe(true);
    expect(f).toBe(false);
  });

  it('unsubscribes (via unsubscriber)', () => {
    const cb = new Callbacks<string>();
    const mock = jest.fn();
    const unsubcribeMock = cb.subscribe(mock);

    cb.publish(TEST_STRING);
    unsubcribeMock();
    cb.publish(TEST_STRING);

    expect(mock).toBeCalledTimes(1);
  });

  it('unsubscribes all', () => {
    const cb = new Callbacks<string>();
    const mock1 = jest.fn();
    const mock2 = jest.fn();

    cb.subscribe(mock1);
    cb.subscribe(mock2);
    cb.unsubscribeAll();
    cb.publish(TEST_STRING);

    expect(mock1).not.toBeCalled();
    expect(mock2).not.toBeCalled();
  });
});
