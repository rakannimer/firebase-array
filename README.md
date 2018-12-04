# Array that exposes same API as Firebase Listener Methods

## Install

```sh
yarn add firebase-array
# or
npm i firebase-array
```

## Usage

```typescript
import FirebaseArray from "firebase-array";

describe("FirebaseArray", () => {
  test("exports", () => {
    expect(FirebaseArray).toBeTruthy();
  });
  test("child_added works", () => {
    const firebaseArray = new FirebaseArray();
    expect(firebaseArray.get()).toEqual({ keys: [], values: [] });
    firebaseArray.childAdded("1", "", null);
    expect(firebaseArray.get()).toEqual({ keys: ["1"], values: [""] });
    firebaseArray.childAdded("2", "", null);
    expect(firebaseArray.get()).toEqual({ keys: ["2", "1"], values: ["", ""] });
    const newState = firebaseArray.childAdded("3", "", "1");
    expect(newState).toEqual({
      keys: ["2", "1", "3"],
      values: ["", "", ""]
    });
  });
  test("child_removed works", () => {
    const firebaseArray = new FirebaseArray();
    expect(firebaseArray.get()).toEqual({ keys: [], values: [] });
    firebaseArray.childAdded("1", "", null);
    firebaseArray.childRemoved("1");
    expect(firebaseArray.get()).toEqual({ keys: [], values: [] });
  });

  test("child_moved works", () => {
    const firebaseArray = new FirebaseArray();
    expect(firebaseArray.get()).toEqual({ keys: [], values: [] });
    firebaseArray.childAdded("1", "v1", null);
    firebaseArray.childAdded("2", "v2", "1");
    expect(firebaseArray.get()).toEqual({
      keys: ["1", "2"],
      values: ["v1", "v2"]
    });
    firebaseArray.childMoved("1", "v1", "2");
    expect(firebaseArray.get()).toEqual({
      keys: ["2", "1"],
      values: ["v2", "v1"]
    });
  });

  test("child_changed works", () => {
    const firebaseArray = new FirebaseArray();
    expect(firebaseArray.get()).toEqual({ keys: [], values: [] });
    firebaseArray.childAdded("1", "v1", null);
    firebaseArray.childAdded("2", "v2", "1");
    expect(firebaseArray.get()).toEqual({
      keys: ["1", "2"],
      values: ["v1", "v2"]
    });
    firebaseArray.childChanged("1", "v1-2", "2");
    expect(firebaseArray.get()).toEqual({
      keys: ["1", "2"],
      values: ["v1-2", "v2"]
    });
  });

  test("onChange works", () => {
    const firebaseArray = new FirebaseArray();
    const changeListener = jest.fn();
    firebaseArray.onChange(changeListener);
    firebaseArray.childAdded("1", "v1", null);
    expect(changeListener.mock.calls.length).toEqual(1);
  });
  test("unsub works", () => {
    const firebaseArray = new FirebaseArray();
    const changeListener = jest.fn();
    const unsub = firebaseArray.onChange(changeListener);
    unsub();
    firebaseArray.childAdded("1", "v1", null);
    expect(changeListener.mock.calls.length).toEqual(0);
  });
  test("unsub fails silently when an event listener is not found", () => {
    const firebaseArray = new FirebaseArray();
    const changeListener = jest.fn();
    firebaseArray.childAdded("1", "v1", null);
    expect(changeListener.mock.calls.length).toEqual(0);
  });
});

});
```
