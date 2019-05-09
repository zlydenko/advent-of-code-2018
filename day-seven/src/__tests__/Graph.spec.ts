import GraphVertex from "../GraphVertex.class";
import GraphEdge from "../GraphEdge.class";
import Graph from "../Graph.class";

describe("graph", () => {
  // test("add vertices to graph", () => {
  //   const vertexA = new GraphVertex("A");
  //   const vertexB = new GraphVertex("B");
  //   const vertexC = new GraphVertex("C");
  //   const edgeAB = new GraphEdge(vertexA, vertexB);
  //   const edgeAC = new GraphEdge(vertexA, vertexC);
  //   const graph = new Graph();

  //   graph
  //     .addVertex(vertexA)
  //     .addVertex(vertexB)
  //     .addVertex(vertexC)
  //     .addEdge(edgeAB)
  //     .addEdge(edgeAC);

  //   expect(graph.getVertices()).toHaveLength(3);
  //   expect(graph.getEdges()).toHaveLength(2);
  // });

  // test("find end vertex", () => {
  //   const vertexA = new GraphVertex("A");
  //   const vertexB = new GraphVertex("B");
  //   const vertexC = new GraphVertex("C");
  //   const vertexD = new GraphVertex("D");
  //   const edgeAB = new GraphEdge(vertexA, vertexB);
  //   const edgeAC = new GraphEdge(vertexA, vertexC);
  //   const edgeCD = new GraphEdge(vertexC, vertexD);
  //   const edgeBD = new GraphEdge(vertexB, vertexD);
  //   const graph = new Graph();

  //   graph
  //     .addVertex(vertexA)
  //     .addVertex(vertexB)
  //     .addVertex(vertexC)
  //     .addVertex(vertexD)
  //     .addEdge(edgeAB)
  //     .addEdge(edgeAC)
  //     .addEdge(edgeCD)
  //     .addEdge(edgeBD);

  //   expect(graph.getEndVertex().toString()).toBe("D");
  // });

  // test("find start vertex", () => {
  //   const vertexA = new GraphVertex("A");
  //   const vertexB = new GraphVertex("B");
  //   const vertexC = new GraphVertex("C");
  //   const vertexD = new GraphVertex("D");
  //   const edgeAB = new GraphEdge(vertexA, vertexB);
  //   const edgeAC = new GraphEdge(vertexA, vertexC);
  //   const edgeCD = new GraphEdge(vertexC, vertexD);
  //   const edgeBD = new GraphEdge(vertexB, vertexD);
  //   const graph = new Graph();

  //   graph
  //     .addVertex(vertexA)
  //     .addVertex(vertexB)
  //     .addVertex(vertexC)
  //     .addVertex(vertexD)
  //     .addEdge(edgeAB)
  //     .addEdge(edgeAC)
  //     .addEdge(edgeCD)
  //     .addEdge(edgeBD);

  //   expect(graph.getStartVertex().toString()).toBe("A");
  // });

  test("get graph to string", () => {
    const graph = new Graph();
    const vertexA = new GraphVertex("A");
    const vertexB = new GraphVertex("B");
    const vertexC = new GraphVertex("C");
    const vertexD = new GraphVertex("D");
    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAD = new GraphEdge(vertexA, vertexD);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeDC = new GraphEdge(vertexD, vertexC);

    graph
      .addVertex(vertexA)
      .addVertex(vertexB)
      .addVertex(vertexC)
      .addVertex(vertexD)
      .addEdge(edgeAB)
      .addEdge(edgeAD)
      .addEdge(edgeBC)
      .addEdge(edgeDC);

    expect(graph.toString()).toBe("ABDC");
  });
});
