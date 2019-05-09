import GraphEdge from "./GraphEdge.class";

export default class GraphVertex {
  private value: string;
  private edges: GraphEdge[] = [];

  constructor(value?: string) {
    if (value) {
      this.value = value;
    } else {
      throw new Error("you must specify value of vertex");
    }
  }

  toString() {
    return this.value;
  }

  addEdge(e: GraphEdge) {
    this.edges = [...this.edges, e];

    return this;
  }

  getEdges(): GraphEdge[] {
    return this.edges;
  }
}
