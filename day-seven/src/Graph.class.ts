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

  private _alphabeticalSort(a: GraphVertex, b: GraphVertex) {
    return a.toString().charCodeAt(0) - b.toString().charCodeAt(0);
  }

  toString(): string {
    const startingVertex: GraphVertex = this.getStartVertex();
    const endingVertex: GraphVertex = this.getEndVertex();
    let availableVertices = Array.from(
      new Set(
        startingVertex
          .getEdges()
          .map(edge => edge.getVertices())
          .flat(1)
          .filter(vertex => vertex !== startingVertex)
      )
    );
    let counter = 1;
    const order = new Map();
    order.set(startingVertex.toString(), counter);
    counter++;
    let finished = false;

    while (!finished) {
      const availableOrdered = availableVertices.sort(this._alphabeticalSort);
      const nextVertex = availableOrdered.filter(currentVertex => {
        const remainVertices = availableOrdered.filter(vertex => vertex !== currentVertex);
        const remainVerticesEndsInCurrent = remainVertices.filter(vertex => {
          const edges = vertex.getEdges();
          return edges.filter(edge => edge.getVertices()[1] === currentVertex).length > 0;
        });

        return remainVerticesEndsInCurrent.length === 0;
      })[0];

      //todo add new vertices from current vertex edges
      const currentVertexEdges = nextVertex.getEdges();
      const currentVertexEdgesVertices = currentVertexEdges
        .map(edge => {
          return edge.getVertices();
        })
        .flat(1)
        .filter(vertex => vertex !== nextVertex);

      const availableVerticesWithoutCurrent = availableVertices.filter(vertex => vertex !== nextVertex);
      availableVertices = Array.from(new Set([...availableVerticesWithoutCurrent, ...currentVertexEdgesVertices]));

      //todo add current vertex value to map and incr counter
      order.set(nextVertex.toString(), counter);
      counter++;
      //todo check if current vertex ending one - and set finished to true
      if (nextVertex === endingVertex) finished = true;
    }

    return Array.from(order)
      .sort((a, b) => {
        return a[1] - b[1];
      })
      .map(([key, _]) => key)
      .join("");
  }
}
