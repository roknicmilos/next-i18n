import {deepMerge} from "@/utils/object";

describe("deepMerge", () => {

  it("Merges two simple objects", () => {
    const defaultObj = { a: 1, b: 2 };
    const primaryObj = { b: 3, c: 4 };
    const expected = { a: 1, b: 3, c: 4 };
    expect(deepMerge(defaultObj, primaryObj)).toEqual(expected);
  });

  it("Merges nested objects", () => {
    const defaultObj = {
      a: {
        1: "1",
        2: "2",
      },
      b: {
        1: "1",
        2: "2",
      },
    };

    const primaryObj = {
      a: {
        1: "3",
      },
      b: {
        1: "3",
      },
    };

    const expectedMergedObj = {
      a: {
        1: "3",
        2: "2",
      },
      b: {
        1: "3",
        2: "2",
      },
    };

    expect(deepMerge(defaultObj, primaryObj)).toEqual(expectedMergedObj);
  });

  it("Handles empty primary object", () => {
    const defaultObj = { a: 1, b: 2 };
    const primaryObj = {};
    const expected = { a: 1, b: 2 };
    expect(deepMerge(defaultObj, primaryObj)).toEqual(expected);
  });

  it("Handles empty default object", () => {
    const defaultObj = {};
    const primaryObj = { a: 1, b: 2 };
    const expected = { a: 1, b: 2 };
    expect(deepMerge(defaultObj, primaryObj)).toEqual(expected);
  });

  it("Merge complex nested objects", () => {
    const defaultObj = {
      a: {
        x: {
          1: "1",
          2: "2",
        },
      },
      b: {
        y: {
          1: "1",
          2: "2",
        },
      },
    };

    const primaryObj = {
      a: {
        x: {
          1: "3",
        },
      },
      b: {
        y: {
          1: "3",
        },
      },
    };

    const expected = {
      a: {
        x: {
          1: "3",
          2: "2",
        },
      },
      b: {
        y: {
          1: "3",
          2: "2",
        },
      },
    };

    expect(deepMerge(defaultObj, primaryObj)).toEqual(expected);
  });

  it("Handles arrays correctly", () => {
    const defaultObj = { a: [1, 2, 3] };
    const primaryObj = { a: [4, 5] };
    const expected = { a: [4, 5] }; // Expected behavior is to replace the array
    expect(deepMerge(defaultObj, primaryObj)).toEqual(expected);
  });

});
