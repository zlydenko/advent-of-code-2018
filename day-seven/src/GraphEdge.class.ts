import GraphVertex from "./GraphVertex.class";

export default class GraphEdge {
  private from: string;
  private to: string;
  private startVertex: GraphVertex;
  private endVertex: GraphVertex;

  constructor(a: GraphVertex, b: GraphVertex) {
    this.startVertex = a;
    this.endVertex = b;
    this.from = this.startVertex.toString();
    this.to = this.endVertex.toString();
  }

  toString(): string {
    return `${this.from}_${this.to}`;
  }

  getVertices(): [GraphVertex, GraphVertex] {
    return [this.startVertex, this.endVertex];
  }
}
