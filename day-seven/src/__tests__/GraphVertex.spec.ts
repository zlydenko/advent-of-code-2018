import GraphVertex from "../GraphVertex.class";

describe("graph", () => {
  test("create graph vertex", () => {
    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");

    function createEmptyVertex() {
      return new GraphVertex();
    }

    expect(createEmptyVertex).toThrow();
    expect(vertexA).toBeDefined();
    expect(vertexB).toBeDefined();
  });

  test("show vertex value", () => {
    const vertexA = new GraphVertex("A");

    expect(vertexA.toString()).toBe("A");
  });
});
