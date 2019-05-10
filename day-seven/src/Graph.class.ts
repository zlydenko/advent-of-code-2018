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

  createVertex(value: any): Vertex {
    const vertex = new Vertex(value);
    !this.vertices.has(vertex) && this.vertices.add(vertex);

    return vertex;
  }

  createEdge(args: { from: Vertex; to: Vertex }): Edge {
    if (args.from && args.to) {
      const edge = new Edge(args.from, args.to);
      !this.edges.has(edge) && this.edges.add(edge);

      return edge;
    } else {
      throw new Error('you need to provide 2 vertices for edge');
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

  getVertex(value: any): Vertex {
    const vertex = Array.from(this.vertices).filter(currentVertex => {
      return currentVertex.value === value;
    })[0];

    return vertex;
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
