import nanoid from "nanoid";

export class Node {
  id: id = nanoid(10);
  private header: [number, number];
  private metadata: number[] = [];
  private children: id[] = [];
  isFulfilled: boolean = false;

  constructor(h: [number, number]) {
    this.header = h;
    this._checkIsFulfilled();
  }

  getChildrenCount(): number {
    return this.header[0];
  }

  getMetadataLength(): number {
    return this.header[1];
  }

  setMeta(meta: number[]): Node {
    this.metadata = meta;
    this._checkIsFulfilled();

    return this;
  }

  getMeta(): number[] {
    return this.metadata;
  }

  private _checkIsFulfilled(): void {
    this.isFulfilled = this.children.length === this.header[0] && this.metadata.length === this.header[1];
  }

  addChild(nodeId: id): Node {
    this.children.push(nodeId);
    this._checkIsFulfilled();

    return this;
  }

  getChildren(): id[] {
    return this.children;
  }
}

type NodeQueue = Array<Node>;
type id = string;

export class Tree {
  private nodes: Map<id, Node> = new Map();
  rootNode: id | undefined;

  constructor(input: number[]) {
    this._buildTree(input);
  }

  private _setNode(node: Node): void {
    this.nodes.set(node.id, node);
  }

  private _buildTree(data: number[]) {
    const stack: NodeQueue = new Array();
    let idx: number = 0;

    while (idx < data.length) {
      let jumpIdx = 0;
      const newNodeHeader: [number, number] = [data[idx], data[idx + 1]];
      const newNode = new Node(newNodeHeader);
      jumpIdx += 2;

      if (this.nodes.size === 0) this.rootNode = newNode.id;

      if (newNodeHeader[0] === 0) {
        //? node havent children -> get meta and proceed
        const meta = data.slice(idx + jumpIdx, idx + jumpIdx + newNodeHeader[1]);
        newNode.setMeta(meta);
        jumpIdx += newNodeHeader[1];

        //? now this node is finished
        //? we need to pop nodes in stack one by one until we find unfinished node

        let currentNode = newNode;

        while (true) {
          //? get last element in stack
          const lastNode = stack[stack.length - 1];

          if (!lastNode) break;

          //? set child
          lastNode.addChild(currentNode.id);
          //? check if fulfilled by children
          if (lastNode.getChildren().length === lastNode.getChildrenCount()) {
            //? yes -> pop out and set meta
            const metaLength = lastNode.getMetadataLength();
            const meta = data.slice(idx + jumpIdx, idx + jumpIdx + metaLength);
            jumpIdx += metaLength;

            lastNode.setMeta(meta);
            stack.pop();
            currentNode = lastNode;
          } else {
            //? no -> proceed to next iteration
            break;
          }
        }
      } else {
        //? node have children -> add node to stack
        stack.push(newNode);
      }

      this._setNode(newNode);
      idx += jumpIdx;
    }
  }

  nodeList(): Map<id, Node> {
    return this.nodes;
  }

  calculateMetaSum(): number {
    return Array.from(this.nodes).reduce((metaSum: number, [_id, node]) => {
      return (metaSum += node.getMeta().reduce((sum: number, n: number) => (sum += n), 0));
    }, 0);
  }
}
