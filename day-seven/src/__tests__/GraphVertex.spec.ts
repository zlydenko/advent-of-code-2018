import GraphVertex from "../GraphVertex.class";
import GraphEdge from "../GraphEdge.class";
import Graph from "../Graph.class";

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

  test("add edges to the vertex", () => {
    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");
    const vertexC = new GraphVertex("C");
    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);

    vertexA.addEdge(edgeAB).addEdge(edgeAC);
    const edgesValues = vertexA
      .getEdges()
      .map(edge => edge.toString())
      .join(",");

    expect(edgesValues).toBe("A_B,A_C");
  });

  // test("add neighbors", () => {
  //   const vertexA = new GraphVertex("A");
  //   const vertexB = new GraphVertex("B");
  //   const vertexC = new GraphVertex("C");
  //   const edgeAB = new GraphEdge(vertexA, vertexB);
  //   const edgeBC = new GraphEdge(vertexB, vertexC);

  //   vertexA.addEdge(edgeAB);
  //   vertexB.addEdge(edgeBC);
  //   vertexB.addNeighbor({ prev: vertexA, next: vertexC });

  //   const expected = {
  //     prev: vertexA,
  //     next: vertexC
  //   };

  //   expect(vertexB.getNeighbors()).toEqual(expect.objectContaining(expected));
  // });
});
