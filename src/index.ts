class FirebaseArray {
  state = [] as (string | number)[];
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
    this.state = [
      ...this.state.slice(0, previousKeyIndex + 1),
      key,
      ...this.state.slice(previousKeyIndex + 1)
    ];
    return;
  };
  childRemoved = (key: string) => {
    const previousKeyIndex = this.state.indexOf(key);
    this.state = [
      ...this.state.slice(0, previousKeyIndex),
      ...this.state.slice(previousKeyIndex + 1)
    ];
    return;
  };
  childMoved = (key: string, previousKey: string) => {
    this.childRemoved(key);
    this.childAdded(key, previousKey);
  };
}
export default FirebaseArray;
