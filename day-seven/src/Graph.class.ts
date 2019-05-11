export enum TraverseAvailability {
  AVAILABLE,
  NOT_AVAILABLE
}

export enum TraverseStatus {
  COMPLETED,
  NOT_COMPLETED
}

export class Vertex {
  value: string;
  private state: TraverseStatus;
  private availability: TraverseAvailability;
  childs: Set<Vertex> = new Set();
  dependencies: Set<Vertex> = new Set();

  constructor(value: string) {
    this.value = value;
    this.state = TraverseStatus.NOT_COMPLETED;
    this.availability = TraverseAvailability.NOT_AVAILABLE;
  }

  changeAvailability(): Vertex {
    this.availability = this.isAvailable() ? TraverseAvailability.NOT_AVAILABLE : TraverseAvailability.AVAILABLE;
    return this;
  }

  changeState(): Vertex {
    this.state = this.isCompleted() ? TraverseStatus.NOT_COMPLETED : TraverseStatus.COMPLETED;
    return this;
  }

  isAvailable(): boolean {
    return this.availability === TraverseAvailability.AVAILABLE;
  }

  isCompleted(): boolean {
    return this.state === TraverseStatus.COMPLETED;
  }
}

export default class Graph {
  vertices: Map<string, Vertex> = new Map();
  startingVertex: Vertex | null = null;

  createEdge(from: string, to: string): Graph {
    let vertexFrom = this.vertices.get(from);
    let vertexTo = this.vertices.get(to);

    if (!vertexFrom) {
      this.vertices.set(from, new Vertex(from));
      vertexFrom = this.vertices.get(from);
    }

    if (!vertexTo) {
      this.vertices.set(to, new Vertex(to));
      vertexTo = this.vertices.get(to);
    }

    if (vertexFrom && vertexTo) {
      vertexFrom.childs.add(vertexTo);
      vertexTo.dependencies.add(vertexFrom);
    }

    if (vertexFrom && vertexFrom.dependencies.size === 0) this.startingVertex = vertexFrom;
    if (vertexTo && vertexTo.dependencies.size === 0) this.startingVertex = vertexTo;

    return this;
  }

  private completeVertex(v: Vertex, r: string): Graph {
    v.changeState();
    v.childs.forEach(child => child.changeAvailability());
    r += v.value;
    return this;
  }

  private availableVertices(): Vertex[] {
    return this.alphabeticallySort(
      Array.from(this.vertices)
        .filter(([_, vertex]) => {
          return vertex.isAvailable();
        })
        .map(([_, vertex]) => vertex)
    );
  }

  private completedVertices(): Vertex[] {
    return Array.from(this.vertices)
      .filter(([_, vertex]) => {
        return vertex.isCompleted();
      })
      .map(([_, vertex]) => vertex);
  }

  private alphabeticallySort(arr: Vertex[]): Vertex[] {
    const sorter = (a: Vertex, b: Vertex) => {
      return a.value.charCodeAt(0) - b.value.charCodeAt(0);
    };

    return arr.sort(sorter);
  }

  toString(): string {
    let result = '';
    if (!this.startingVertex) return result;

    this.completeVertex(this.startingVertex, result);

    while (true) {
      const availableVertices = this.availableVertices();
      const traverseOver = this.completedVertices().length === this.vertices.size;

      if (traverseOver) break;

      for (let i = 0; i < availableVertices.length; i++) {
        //? check dependencies for available vertex with idx i
        const vDeps = availableVertices[i].dependencies;

        if (vDeps.size > 0) {
          //? if he has dependencies check if they in this.completedVertices()
          const completedDeps = Array.from(vDeps).filter(reqDep => {
            return this.completedVertices().includes(reqDep);
          });
          if (completedDeps.length === vDeps.size) {
            //? if yes -> complete vertex
            this.completeVertex(availableVertices[i], result);
            break;
          }
        } else {
          this.completeVertex(availableVertices[i], result);
          break;
        }
      }
    }

    return result;
  }
}
