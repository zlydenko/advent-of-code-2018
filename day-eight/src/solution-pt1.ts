import nanoid from 'nanoid';

type id = string;

// export class Tree {
//   private root: TreeNode | null = null;

//   setRoot(node: TreeNode) {
//     this.root = node;
//   }

//   isRootCreated(): boolean {
//     return this.root !== null;
//   }
// }

// export class TreeNode {}

// const creatingTreeReducer = (tree: Tree, value: number): Tree => {
//   return tree;
// };

// const creatingTree = (data: number[]): Tree => {
//   return data.reduce(creatingTreeReducer, new Tree());
// };

const x = [
  {
    id: 0,
    header: [1, 3],
    children: [1]
  },
  {
    id: 1,
    header: [0, 1],
    children: null
  },
  {
    id: 2,
    header: [0, 1],
    children: null
  }
];

export class Tree {
  private nodes: Node[] = [];
  private edges: Edge[] = [];

  nodeById(id: id): Node | null {
    return this.nodes.find(node => node.id === id) || null;
  }

  edgeById(id: id): Edge | null {
    return this.edges.find(edge => edge.id === id) || null;
  }

  addNode(n: Node): Node {
    this.nodes.push(n);

    return n;
  }

  addEdge(e: Edge): Edge {
    this.edges.push(e);

    return e;
  }

  isEmpty(): boolean {
    return this.nodes.length === 0;
  }

  getChildrenCount(id: id): number {
    return this.edges.filter(edge => edge.parent === id).length;
  }

  getLastNodeByChildren(): Node | null {
    let nodeId = null;

    for (let i = this.nodes.length - 1; i >= 0; i--) {
      console.log('checking node', this.nodes[i]);
      const { id, header } = this.nodes[i];
      const [expectedChildrenCount, _] = header;
      const childrenCount = this.getChildrenCount(id);
      console.log('expected children', expectedChildrenCount);
      console.log('fact', childrenCount);

      if (childrenCount < expectedChildrenCount) {
        console.log('children not fulfilled, breaking');
        nodeId = id;
        break;
      }
    }

    console.log('returning');
    return nodeId ? this.nodeById(nodeId) : null;
  }

  getLastNodeByMeta(): Node | null {
    let nodeId = null;

    for (let i = this.nodes.length - 1; i >= 0; i--) {
      console.log('checking meta for', this.nodes[i]);
      const { id, header, meta } = this.nodes[i];
      const [_, metaLength] = header;

      console.log('expected meta length', metaLength);
      console.log('current meta', meta);

      if (meta.length < metaLength) {
        nodeId = id;
        break;
      }
    }

    return nodeId ? this.nodeById(nodeId) : null;
  }

  nodesChildrenFulfilled(id: id): boolean {
    const node = this.nodeById(id);
    if (!node) return false;
    const childrenCount = node.header[0];
    const isFulfilled = this.getChildrenCount(id) === childrenCount;
    console.log('is fulfilled', isFulfilled);
    return isFulfilled;
  }

  getMetaSum(): number {
    return this.nodes.reduce((sum, node) => (sum += node.meta.reduce((nodeSum, n) => (nodeSum += n), 0)), 0);
  }

  isNodesFulfilled(): boolean {
    const nodesIds = this.nodes.map(node => node.id);

    return nodesIds.filter(nodeId => !this.nodesChildrenFulfilled(nodeId)).length === 0;
  }
}

export class Node {
  id: id;
  header: [number, number];
  meta: number[] = [];

  constructor(x: [number, number]) {
    this.header = x;
    this.id = nanoid(10);
  }

  setMeta(m: number[]): Node {
    this.meta = m;

    return this;
  }

  haveChildren(): boolean {
    return this.header[0] > 0;
  }
}

export class Edge {
  id: id;
  child: id;
  parent: id;

  constructor(child: id, parent: id) {
    this.child = child;
    this.parent = parent;
    this.id = nanoid(10);
  }
}

const testData2 = [2, 3, 0, 1, 55, 0, 1, 88, 11, 15, 16];

export const buildTree = (data: number[]): Tree => {
  const tree = new Tree();
  const testData2 = [...data];
  let idx = 0;

  while (idx < testData2.length) {
    console.log(idx);
    let sliced = 2;
    const header: [number, number] = [testData2[idx], testData2[idx + 1]];
    console.log('header', header);

    if (tree.isEmpty()) {
      console.log('tree is empty');
      const node = new Node(header);
      console.log('created node', node);

      if (header[0] === 0) {
        sliced += header[1];
        const meta = testData2.slice(idx + 2, idx + 2 + header[1]);
        node.setMeta(meta);
        console.log('setting meta', meta);
      }

      tree.addNode(node);
    } else {
      console.log('tree is not empty');

      //? tree is not empty
      //todo get related node (with no fulfilled children)
      const lastNode = tree.getLastNodeByChildren();

      console.log('last node', lastNode);

      if (!lastNode) {
        throw new Error('oops');
      }

      //todo create node with header
      const newNode = new Node(header);
      console.log('created', newNode);
      //todo create edge between this nodes
      const edge = new Edge(newNode.id, lastNode.id);

      //todo check if new node havent children -> set meta
      if (!newNode.haveChildren()) {
        console.log('new node havent children, adding meta');
        sliced += header[1];
        const meta = testData2.slice(idx + 2, idx + 2 + header[1]);
        console.log(`slice from ${idx + 2} to ${idx + 2 + header[1]}`);
        console.log('meta', meta);
        newNode.setMeta(meta);
      }

      tree.addNode(newNode);
      tree.addEdge(edge);
      console.log('added node and edge to tree');

      //todo check if related node now fulfilled
      const lastNodeFulfilled = tree.nodesChildrenFulfilled(lastNode.id);
      console.log('is last node fulfilled with children', lastNodeFulfilled);
      console.log('current node children count', header[0]);
      //todo if it is -> set him meta
      if (lastNodeFulfilled && header[0] === 0) {
        const nodeWithoutMeta = tree.getLastNodeByMeta();
        console.log('last node fulfilled, get one who needs meta', nodeWithoutMeta);

        if (nodeWithoutMeta) {
          const metaLength = nodeWithoutMeta.header[1];
          const meta = testData2.slice(idx + sliced, idx + sliced + metaLength);
          console.log(`slicing from ${idx + sliced} to ${idx + sliced + metaLength}`);
          nodeWithoutMeta.setMeta(meta);
          console.log('setting meta', meta);
          sliced += metaLength;
        }
      }
    }

    idx += sliced;
    // console.log('tree', tree);
    //? check if there nodes not fulfilled
    const isNodesFulfilled = tree.isNodesFulfilled();
    //? if there is no any -> left is someone's meta
    if (isNodesFulfilled) {
      const nodeWithoutMeta = tree.getLastNodeByMeta();
      console.log('last node fulfilled, get one who needs meta', nodeWithoutMeta);

      if (nodeWithoutMeta) {
        const metaLength = nodeWithoutMeta.header[1];
        const meta = testData2.slice(idx, idx + metaLength);
        console.log(`slicing from ${idx + sliced} to ${idx + sliced + metaLength}`);
        nodeWithoutMeta.setMeta(meta);
        console.log('setting meta', meta);
      }

      break;
    }
  }

  return tree;
};
