class FirebaseArray {
  keys: any[];
  values: any[];
  listeners: Array<(f: FirebaseArray) => void>;
  constructor(keys = [], values = [], listeners = []) {
    this.keys = keys;
    this.values = values;
    this.listeners = listeners;
  }
  onChange = (eventHandler: (f: FirebaseArray) => void) => {
    this.listeners.push(eventHandler);
  };
  emit = () => {
    this.listeners.forEach(fn => fn(this));
  };
  get = () => {
    return {
      keys: this.keys,
      values: this.values
    };
  };
  emitAndGet = () => {
    this.emit();
    return this.get();
  };

  childAdded = (key: string, value: any, previousKey: string | null) => {
    if (previousKey === null) {
      this.keys.unshift(key);
      this.values.unshift(value);
      return this.emitAndGet();
    }
    const previousKeyIndex = this.keys.indexOf(previousKey);
    if (previousKeyIndex === -1) {
      this.keys.push(key);
      this.values.push(value);
      return this.emitAndGet();
    }
    this.keys.splice(previousKeyIndex + 1, 0, key);
    this.values.splice(previousKeyIndex + 1, 0, value);
    return this.emitAndGet();
  };
  childRemoved = (key: string) => {
    const keyIndex = this.keys.indexOf(key);
    this.keys.splice(keyIndex, 1);
    this.values.splice(keyIndex, 1);
    return this.emitAndGet();
  };
  childMoved = (key: string, value: any, previousKey: string) => {
    this.childRemoved(key);
    this.childAdded(key, value, previousKey);
    return this.emitAndGet();
  };
  childChanged = (key: string, value: any, previousKey: string) => {
    const keyIndex = this.keys.indexOf(key);
    if (keyIndex === -1) {
      this.childAdded(key, value, previousKey);
    } else {
      this.keys[keyIndex] = key;
      this.values[keyIndex] = value;
    }
    return this.emitAndGet();
  };
}
export default FirebaseArray;
