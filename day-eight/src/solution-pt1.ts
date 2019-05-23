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

  // findLastUncompleteNode(): Node {
  //   for (let i = this.nodes.length - 1; i >= 0; i--) {
  //     const id = this.nodes[i].id;
  //     const [childrenCount, metaLength] = this.nodes[i].header;
  //   }
  // }
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

const tree = new Tree();
const testData2 = [2, 3, 0, 1, 55, 0, 1, 88, 11, 15, 16];

let idx = 0;

while (idx < testData2.length) {
  let sliced = 2;
  const header: [number, number] = [testData2[idx], testData2[idx + 1]];

  if (tree.isEmpty()) {
    const node = new Node(header);

    if (header[0] === 0) {
      sliced += header[1];
      const meta = testData2.slice(idx + 2, header[1]);
      node.setMeta(meta);
    }

    tree.addNode(node);
  } else {
    //? tree is not empty
    //todo get related node (with no fulfilled children)
    //todo create node with header
    //todo create edge between this nodes
    //todo check if new node havent children -> set meta
    //todo check if related node now fulfilled
    //todo if it is -> set him meta
  }

  idx += sliced - 1;
}
