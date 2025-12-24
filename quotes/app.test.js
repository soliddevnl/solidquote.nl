import { describe, test, expect } from "vitest";
import { shuffle, selectDailyQuotes } from "./select-daily.js";

describe("shuffle", () => {
  test("returns array with same length", () => {
    const input = [1, 2, 3, 4, 5];
    expect(shuffle(input)).toHaveLength(5);
  });

  test("contains all original elements", () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result.sort()).toEqual([1, 2, 3, 4, 5]);
  });

  test("does not mutate original array", () => {
    const input = [1, 2, 3];
    const inputCopy = [...input];
    shuffle(input);
    expect(input).toEqual(inputCopy);
  });

  test("actually shuffles the array", () => {
    const input = Array.from({ length: 20 }, (_, i) => i);
    const result = shuffle(input);
    // Zeer kleine kans dat dit faalt bij echte random shuffle
    expect(result).not.toEqual(input);
  });
});

describe("selectDailyQuotes", () => {
  const mockQuotes = [
    { text: "Quote 1", author: "Author 1" },
    { text: "Quote 2", author: "Author 2" },
    { text: "Quote 3", author: "Author 3" },
    { text: "Quote 4", author: "Author 4" },
    { text: "Quote 5", author: "Author 5" },
    { text: "Quote 6", author: "Author 6" },
    { text: "Quote 7", author: "Author 7" },
  ];

  test("returns 5 quotes by default", () => {
    const result = selectDailyQuotes(mockQuotes);
    expect(result).toHaveLength(5);
  });

  test("returns requested number of quotes", () => {
    expect(selectDailyQuotes(mockQuotes, 3)).toHaveLength(3);
    expect(selectDailyQuotes(mockQuotes, 7)).toHaveLength(7);
  });

  test("returns subset of original pool", () => {
    const result = selectDailyQuotes(mockQuotes, 3);
    result.forEach((quote) => {
      expect(mockQuotes).toContainEqual(quote);
    });
  });

  test("handles pool smaller than requested count", () => {
    const smallPool = mockQuotes.slice(0, 3);
    const result = selectDailyQuotes(smallPool, 5);
    expect(result).toHaveLength(3);
  });

  test("does not return duplicate quotes", () => {
    const result = selectDailyQuotes(mockQuotes, 5);
    const uniqueTexts = new Set(result.map((q) => q.text));
    expect(uniqueTexts.size).toBe(result.length);
  });
});
