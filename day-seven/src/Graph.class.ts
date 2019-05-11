export class Vertex {
  value: any;
  dependencies: Set<any> = new Set();
  childs: Set<any> = new Set();

  constructor(value: any) {
    this.value = value;
  }

  addDependency(dep: Vertex): Vertex {
    this.dependencies.add(dep);

    return this;
  }

  addChild(child: Vertex): Vertex {
    this.childs.add(child);

    return this;
  }

  hasDependencies(): boolean {
    return this.dependencies.size > 0;
  }

  hasChilds(): boolean {
    return this.childs.size > 0;
  }
}

export class Edge {
  from: Vertex;
  to: Vertex;

  constructor(from: Vertex, to: Vertex) {
    this.from = from;
    this.to = to;

    //? from get a child
    //? to get a dependency
    this.from.addChild(this.to);
    this.to.addDependency(this.from);
  }

  getValues() {
    return {
      from: this.from.value,
      to: this.to.value
    };
  }
}

export default class Graph {
  private vertices: Set<Vertex> = new Set();
  private edges: Set<Edge> = new Set();

  upsertVertex(value: any): Vertex {
    const vertex = this.getVertex(value);
    if (vertex) {
      return vertex;
    } else {
      const newVertex = new Vertex(value);
      this.vertices.add(newVertex);
      return newVertex;
    }
  }

  upsertEdge(args: { from: Vertex; to: Vertex }): Edge {
    const edge = this.getEdge({ from: args.from, to: args.to });
    if (edge) {
      return edge;
    } else {
      const newEdge = new Edge(args.from, args.to);
      this.edges.add(newEdge);
      return newEdge;
    }
  }

  hasVertex(value: any): boolean {
    const filtered = Array.from(this.vertices).filter(currentVertex => currentVertex.value === value);

    return filtered.length > 0;
  }

  hasEdge(args: { from: any; to: any }): boolean {
    if (args.from && args.to) {
      const { from, to } = args;
      const filtered = Array.from(this.edges).filter(currentEdge => {
        const currentValues = currentEdge.getValues();
        return currentValues.from === from && currentValues.to === to;
      });

      return filtered.length > 0;
    } else {
      throw new Error('you need to provide from and to values');
    }
  }

  getEdge(args: { from: Vertex; to: Vertex }): Edge | null {
    const edge = Array.from(this.edges).filter(currentEdge => {
      return currentEdge.from === args.from && currentEdge.to === args.to;
    })[0];

    return edge ? edge : null;
  }

  getVertex(value: any): Vertex | null {
    const vertex = Array.from(this.vertices).filter(currentVertex => {
      return currentVertex.value === value;
    })[0];

    return vertex ? vertex : null;
  }

  startVertex(): Vertex {
    const filtered = Array.from(this.vertices).filter(currentVertex => !currentVertex.hasDependencies());
    const vertex = filtered[0];

    if (vertex) {
      if (filtered.length > 1) {
        throw new Error('graph has more than one starting vertex');
      } else {
        return vertex;
      }
    } else {
      throw new Error('graph hasnt starting vertex');
    }
  }

  verticesQuantity(): number {
    return this.vertices.size;
  }

  edgesQuantity(): number {
    return this.edges.size;
  }
}
