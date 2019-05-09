import GraphVertex from "../GraphVertex.class";
import GraphEdge from "../GraphEdge.class";

describe("graph edge", () => {
  test("create edge", () => {
    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");
    const edgeAB = new GraphEdge(vertexA, vertexB);

    expect(edgeAB).toBeDefined();
  });

  test("show edge value", () => {
    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");
    const edgeAB = new GraphEdge(vertexA, vertexB);

    expect(edgeAB.toString()).toBe("A_B");
  });

  test("show edge vertices", () => {
    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");
    const edgeAB = new GraphEdge(vertexA, vertexB);

    expect(edgeAB.getVertices()[0]).toBe(vertexA);
    expect(edgeAB.getVertices()[1]).toBe(vertexB);
  });
});
