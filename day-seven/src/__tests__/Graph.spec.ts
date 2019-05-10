import Graph, { Vertex, Edge } from '../Graph.class';

describe('Graph', () => {
  test('create empty graph', () => {
    const graph = new Graph();

    expect(graph).toBeDefined();
    expect(graph).toBeInstanceOf(Graph);
  });

  test('create vertex', () => {
    const vertex = new Vertex('A');

    expect(vertex.value).toBe('A');
    expect(vertex.dependencies.size).toBe(0);
    expect(vertex.childs.size).toBe(0);
    expect(vertex.hasDependencies()).toBe(false);
    expect(vertex.hasChilds()).toBe(false);
  });

  test('add dependency to vertex', () => {
    const vertexA = new Vertex('A');
    const vertexB = new Vertex('B');
    const vertexC = new Vertex('C');

    vertexA.addDependency(vertexB).addDependency(vertexC);

    expect(vertexA.hasDependencies()).toBe(true);
    expect(vertexA.dependencies.size).toBe(2);
  });

  test('add child to vertex', () => {
    const vertexA = new Vertex('A');
    const vertexB = new Vertex('B');
    const vertexC = new Vertex('C');

    vertexA.addChild(vertexB).addChild(vertexC);

    expect(vertexA.hasChilds()).toBe(true);
    expect(vertexA.childs.size).toBe(2);
  });

  test('create edge', () => {
    const vertexA = new Vertex('A');
    const vertexB = new Vertex('B');
    const edge = new Edge(vertexA, vertexB);

    expect(edge.from).toBe(vertexA);
    expect(edge.to).toBe(vertexB);
    expect(vertexA.hasChilds()).toBe(true);
    expect(vertexB.hasDependencies()).toBe(true);
  });

  test('create graph with vertices', () => {
    const graph = new Graph();
    const elements = ['A', 'B', 'C', 'A', 'B'];

    elements.forEach(element => {
      if (!graph.hasVertex(element)) {
        graph.createVertex(element);
      }
    });

    expect(graph.verticesQuantity()).toBe(3);
  });

  test('create graph with edges', () => {
    const graph = new Graph();
    const edges = ['CA', 'CF', 'AB', 'AD', 'BE', 'DE', 'FE'];

    edges.forEach(edge => {});
  });
});
