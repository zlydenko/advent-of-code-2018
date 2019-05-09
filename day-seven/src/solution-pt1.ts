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
  const vertices = new Map();

  input.forEach(edgeStr => {
    const [startVertexStr, endVertexStr] = edgeStr.split("");
    const startVertex = vertices.get(startVertexStr);
    const endVertex = vertices.get(endVertexStr);

    if (!startVertex) {
      const vertex = new GraphVertex(startVertexStr);
      vertices.set(startVertexStr, vertex);
      graph.addVertex(vertex);
    }

    if (!endVertex) {
      const vertex = new GraphVertex(endVertexStr);
      vertices.set(endVertexStr, vertex);
      graph.addVertex(vertex);
    }

    const edge = new GraphEdge(vertices.get(startVertexStr), vertices.get(endVertexStr));
    graph.addEdge(edge);
  });

  return graph;
};
