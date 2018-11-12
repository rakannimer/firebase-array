class FirebaseArray {
  keys: any[];
  values: any[];

  constructor(keys = [], values = []) {
    this.keys = keys;
    this.values = values;
  }
  get = () => {
    return {
      keys: this.keys,
      values: this.values
    };
  };
  childAdded = (key: string, value: any, previousKey: string | null) => {
    if (previousKey === null) {
      this.keys.unshift(key);
      this.values.unshift(value);
      return this.get();
    }
    const previousKeyIndex = this.keys.indexOf(previousKey);
    if (previousKeyIndex === -1) {
      this.keys.push(key);
      this.values.push(value);
      return this.get();
    }
    this.keys.splice(previousKeyIndex + 1, 0, key);
    this.values.splice(previousKeyIndex + 1, 0, value);
    return this.get();
  };
  childRemoved = (key: string) => {
    const keyIndex = this.keys.indexOf(key);
    this.keys.splice(keyIndex, 1);
    this.values.splice(keyIndex, 1);
    return this.get();
  };
  childMoved = (key: string, value: any, previousKey: string) => {
    this.childRemoved(key);
    this.childAdded(key, value, previousKey);
    return this.get();
  };
  childChanged = (key: string, value: any, previousKey: string) => {
    const keyIndex = this.keys.indexOf(key);
    if (keyIndex === -1) {
      this.childAdded(key, value, previousKey);
    } else {
      this.keys[keyIndex] = key;
      this.values[keyIndex] = value;
    }
    return this.get();
  };
}
export default FirebaseArray;
