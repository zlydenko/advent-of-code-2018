import GraphVertex from "./GraphVertex.class";
import GraphEdge from "./GraphEdge.class";

export default class Graph {
  private vertices: GraphVertex[] = [];
  private edges: GraphEdge[] = [];

  addVertex(v: GraphVertex): Graph {
    this.vertices = [...this.vertices, v];
    return this;
  }

  addEdge(e: GraphEdge): Graph {
    const edgeVertices = e.getVertices();

    this.edges = [...this.edges, e];
    edgeVertices[0].addEdge(e);

    return this;
  }

  getVertices(): GraphVertex[] {
    return this.vertices;
  }

  getEdges(): GraphEdge[] {
    return this.edges;
  }

  getEndVertex(): GraphVertex {
    return this.vertices.filter(vertex => {
      return vertex.getEdges().length === 0;
    })[0];
  }

  getStartVertex(): GraphVertex {
    return this.vertices.filter(vertex => {
      const checkingVertexValue = vertex.toString();

      const foundEdges = this.edges.filter(edge => {
        return edge.getVertices()[1].toString() === checkingVertexValue;
      });

      return foundEdges.length === 0;
    })[0];
  }
}
