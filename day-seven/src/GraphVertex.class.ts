import GraphEdge from "./GraphEdge.class";

// interface VertexNeighbors {
//   prev: GraphVertex;
//   next: GraphVertex;
// }

export default class GraphVertex {
  private value: string;
  private edges: GraphEdge[] = [];
  // private neighbors: VertexNeighbors | null = null;

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

  // addNeighbor(args: { prev?: GraphVertex; next?: GraphVertex }): GraphVertex {
  //   if (args.prev) {
  //     this.neighbors ? (this.neighbors.prev = args.prev) : { prev: args.prev };
  //   }
  //   if (args.next) {
  //     this.neighbors ? (this.neighbors.next = args.next) : { next: args.next };
  //   }

  //   return this;
  // }

  getEdges(): GraphEdge[] {
    return this.edges;
  }

  // getNeighbors(): VertexNeighbors | null {
  //   return this.neighbors;
  // }
}
