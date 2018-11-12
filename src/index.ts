class FirebaseArray {
  state: any;
  constructor(arr = []) {
    this.state = arr;
  }
  get = () => {
    return this.state;
  };
  childAdded = (key: string, previousKey: string | null) => {
    if (previousKey === null) {
      this.state.unshift(key);
      return;
    }
    const previousKeyIndex = this.state.indexOf(previousKey);
    if (previousKeyIndex === -1) {
      this.state.push(key);
      return;
    }
    this.state.splice(previousKeyIndex + 1, 0, key);
    return;
  };
  childRemoved = (key: string) => {
    const previousKeyIndex = this.state.indexOf(key);
    this.state.splice(previousKeyIndex, 1);
    return;
  };
  childMoved = (key: string, previousKey: string) => {
    this.childRemoved(key);
    this.childAdded(key, previousKey);
  };
}
export default FirebaseArray;
