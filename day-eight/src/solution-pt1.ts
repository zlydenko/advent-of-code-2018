import nanoid from 'nanoid';
import inputLoader from '~root/inputLoader';

type id = string;

export class Tree {
  private rootNode: Node;
  private nodes: Node[] = [];

  constructor(data: number[]) {
    //? create root node here
    this.rootNode = this._createRootNode(data);
    this._parseInput(data.slice(2, -this.rootNode.howManyMetadata()));
  }

  private _createRootNode(data: number[]): Node {
    const rootNode = new Node([data[0], data[1]]);
    const meta = data.slice(-data[1]);
    rootNode.setMeta(meta);

    return rootNode;
  }

  private _parseInput(data: number[]): void {
    let idx = 0;
    while (idx < data.length) {
      let slice = 0;

      const newNode = new Node([data[idx], data[idx + 1]]);
      console.log('created node', newNode);
      slice += 2;

      if (data[idx] === 0) {
        console.log('no children for current node -> extract meta');
        const meta = data.slice(idx + 2, idx + 2 + data[idx + 1]);
        console.log('get meta', meta);
        newNode.setMeta(meta);
        slice += idx + 2 + data[idx + 1];
      }

      console.log('looking for related node');
      const relatedNode = this._getRelatedNode();

      console.log('found', relatedNode);

      const wouldBeFulfilled = relatedNode.isFulfilled(relatedNode.getChildren().length + 1);

      relatedNode.addChild(newNode.id);

      if (wouldBeFulfilled) {
        console.log('setting meta for related node');
        const relatedNodeMetaLength = relatedNode.howManyMetadata();
        const meta = data.slice(slice, slice + relatedNodeMetaLength);

        console.log('meta for related', meta);

        slice += relatedNodeMetaLength;

        relatedNode.setMeta(meta);
      }

      this.nodes.push(newNode);

      idx += slice;
    }
  }

  private _getRelatedNode(): Node {
    const unfulfilledNodes = this.nodes.filter(node => !node.isFulfilled());
    const relatedNode = unfulfilledNodes[unfulfilledNodes.length - 1] || this.rootNode;

    return relatedNode;
  }

  getMetaSum(): number {
    const rootMeta = this.rootNode.getMeta();
    const childrenMeta = this.nodes.reduce((meta: number[], node: Node) => {
      const childMeta = node.getMeta();

      return [...meta, ...childMeta];
    }, []);
    const sum = [...rootMeta, ...childrenMeta].reduce((sum, n) => (sum += n), 0);

    return sum;
  }

  showNodes(): void {
    console.log('---------------------');
    console.log('nodes log');
    console.log('---------------------');

    console.log(this.rootNode);

    this.nodes.forEach(node => {
      console.log(node);
    });
  }
}

export class Node {
  id: id;
  private header: [number, number];
  private meta: number[] = [];
  private children: id[] = [];

  constructor(h: [number, number]) {
    this.header = h;
    this.id = nanoid(10);
  }

  addChild(id: id): Node {
    this.children.push(id);

    return this;
  }

  getChildren(): id[] {
    return this.children;
  }

  setMeta(meta: number[]): Node {
    this.meta = meta;

    return this;
  }

  getMeta(): number[] {
    return this.meta;
  }

  howManyChildren(): number {
    return this.header[0];
  }

  howManyMetadata(): number {
    return this.header[1];
  }

  isFulfilled(possibleCount?: number): boolean {
    return possibleCount ? possibleCount === this.header[0] : this.children.length === this.header[0];
  }

  isMetaSet(): boolean {
    return this.meta.length === this.header[1];
  }

  isDone(): boolean {
    return this.isFulfilled() && this.isMetaSet();
  }
}
