import Graph from "./Graph.class";
import GraphVertex from "./GraphVertex.class";
import GraphEdge from "./GraphEdge.class";

//? again this TYPES can't get string[][]
export const parseInput = (input: string[]): string[] => {
  const regPattern = new RegExp(/(?<!^)[A-Z]/g);
  return input.map(str => {
    const keys = str.match(regPattern);
    return keys === null ? "" : keys.join("");
  });
};

export const createGraph = (input: string[]): Graph => {
  const graph = new Graph();
  const { vertices, edges } = input.reduce(
    (acc, edgeStr) => {
      const [startVertexStr, endVertexStr] = edgeStr.split("");
      const startVertex = new GraphVertex(startVertexStr);
      const endVertex = new GraphVertex(endVertexStr);
      const edge = new GraphEdge(startVertex, endVertex);

      if (!acc.vertices.has(startVertex)) acc.vertices.add(startVertex);
      if (!acc.vertices.has(endVertex)) acc.vertices.add(endVertex);
      if (!acc.edges.has(edge)) acc.edges.add(edge);

      return acc;
    },
    {
      vertices: new Set(),
      edges: new Set()
    }
  );

  vertices.forEach(vertex => graph.addVertex(vertex));
  edges.forEach(edge => graph.addEdge(edge));

  return graph;
};
