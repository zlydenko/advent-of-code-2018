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
    this.edges = [...this.edges, e];
    const edgeVertices = e.getVertices();
    edgeVertices[0].addEdge(e);
    //? we need add edges to vertex
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
}
