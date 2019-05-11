import Graph, { Vertex, TraverseAvailability, TraverseStatus } from '../Graph.class';

describe('Graph', () => {
  test('create vertex', () => {
    const vertexA = new Vertex('A');

    expect(vertexA.isAvailable()).toBe(false);
    expect(vertexA.isCompleted()).toBe(false);

    vertexA.changeAvailability().changeState();

    expect(vertexA.isAvailable()).toBe(true);
    expect(vertexA.isCompleted()).toBe(true);
    expect(vertexA.childs.size).toBe(0);
    expect(vertexA.dependencies.size).toBe(0);
    expect(vertexA.value).toBe('A');
  });

  test('create edge', () => {
    const graph = new Graph();
    const edges = ['CA', 'CF', 'FB'];

    edges.forEach(edge => {
      const [from, to] = edge.split('');
      graph.createEdge(from, to);
    });

    const vertexB = graph.vertices.get('B');
    const vertexC = graph.vertices.get('C');

    if (vertexB && vertexC) {
      expect(vertexB.value).toBe('B');
      expect(vertexB.childs.size).toBe(0);
      expect(vertexB.dependencies.size).toBe(1);
      expect(vertexC.value).toBe('C');
      expect(vertexC.childs.size).toBe(2);
      expect(vertexC.dependencies.size).toBe(0);
      expect(graph.startingVertex && graph.startingVertex.value).toBe('C');
    } else {
      throw new Error('something went wrong');
    }
  });

  test('graph to string', () => {
    const graph = new Graph();
    const edges = ['CA', 'CF', 'AB', 'AD', 'BE', 'DE', 'FE'];

    edges.forEach(edge => {
      const [from, to] = edge.split('');
      graph.createEdge(from, to);
    });

    console.log(graph.toString());
  });
});
