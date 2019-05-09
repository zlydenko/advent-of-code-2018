import inputLoader from "../inputLoader";
import { parseInput, createGraph } from "../solution-pt1";

describe("day 7: part one", () => {
  const testData = [
    "Step F must be finished before step E can begin.",
    "Step A must be finished before step B can begin.",
    "Step A must be finished before step D can begin.",
    "Step B must be finished before step E can begin.",
    "Step D must be finished before step E can begin.",
    "Step C must be finished before step A can begin.",
    "Step C must be finished before step F can begin."
  ];
  let data: string[] = [];

  test("load input data", async () => {
    try {
      data = await inputLoader();

      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(101);
    } catch (error) {
      throw error;
    }
  });

  test("parse the input", () => {
    const output = parseInput(testData);

    expect(output[0]).toBe("FE");
    expect(output[6]).toBe("CF");
    expect(output).toHaveLength(7);
  });

  test("create graph", () => {
    const parsedInput = parseInput(testData);
    const graph = createGraph(parsedInput);

    expect(graph.getStartVertex().toString()).toBe("C");
    expect(graph.getEndVertex().toString()).toBe("E");
  });

  test("output graph in string (test data)", () => {
    const parsedInput = parseInput(testData);
    const graph = createGraph(parsedInput);
    const output = graph.toString();
    const expected = "CABDFE";

    expect(output).toBe(expected);
  });
});
