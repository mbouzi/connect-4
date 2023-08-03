import { resetBoard } from "../src/utils";

describe("New Board", () => {
  test("Should have 6 rows", () => {
    expect(resetBoard().rowLength).toBe(6);
  });

  test("Should have 7 column", () => {
    expect(resetBoard().colLength).toBe(7);
  });
});
