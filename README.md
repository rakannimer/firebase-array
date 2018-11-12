# Array that exposes same API as Firebase Listener Methods

```typescript
import FirebaseArray from "firebase-array";

describe("FirebaseArray", () => {
  test("exports", () => {
    expect(FirebaseArray).toBeTruthy();
  });
  test("child_added works", () => {
    const firebaseArray = new FirebaseArray();
    expect(firebaseArray.get()).toEqual([]);
    firebaseArray.childAdded("1", null);
    expect(firebaseArray.get()).toEqual(["1"]);
    firebaseArray.childAdded("2", null);
    expect(firebaseArray.get()).toEqual(["2", "1"]);
    firebaseArray.childAdded("2", "1");
    expect(firebaseArray.get()).toEqual(["2", "1", "2"]);
  });
  test("child_removed works", () => {
    const firebaseArray = new FirebaseArray();
    expect(firebaseArray.get()).toEqual([]);
    firebaseArray.childAdded("1", null);
    firebaseArray.childRemoved("1");
    expect(firebaseArray.get()).toEqual([]);
  });

  test("child_moved works", () => {
    const firebaseArray = new FirebaseArray();
    expect(firebaseArray.get()).toEqual([]);
    firebaseArray.childAdded("1", null);
    firebaseArray.childAdded("2", "1");
    expect(firebaseArray.get()).toEqual(["1", "2"]);
    firebaseArray.childMoved("1", "2");
    expect(firebaseArray.get()).toEqual(["2", "1"]);
  });
});
```
