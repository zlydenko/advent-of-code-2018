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
      console.log("current idx", idx);
      let jumpIdx = 0;
      const newNodeHeader: [number, number] = [data[idx], data[idx + 1]];
      const newNode = new Node(newNodeHeader);
      console.log("created node", newNode);
      jumpIdx += 2;

      if (newNodeHeader[0] === 0) {
        //? node havent children -> get meta and proceed
        const meta = data.slice(idx + jumpIdx, idx + jumpIdx + newNodeHeader[1]);
        console.log("node havent children -> setting meta", meta);
        newNode.setMeta(meta);
        jumpIdx += newNodeHeader[1];

        //? now this node is finished
        //? we need to pop nodes in stack one by one until we find unfinished node

        let currentNode = newNode;

        while (true) {
          console.log("current node", currentNode);
          //? get last element in stack
          const lastNode = stack[stack.length - 1];

          if (!lastNode) break;

          console.log("last node in stack", lastNode);
          //? set child
          lastNode.addChild(currentNode.id);
          //? check if fulfilled by children
          if (lastNode.getChildren().length === lastNode.getChildrenCount()) {
            console.log("last node fulfilled with children, set meta");
            //? yes -> pop out and set meta
            const metaLength = lastNode.getMetadataLength();
            const meta = data.slice(idx + jumpIdx, idx + jumpIdx + metaLength);
            console.log(meta);
            jumpIdx += metaLength;

            lastNode.setMeta(meta);
            stack.pop();
            currentNode = lastNode;
          } else {
            //? no -> proceed to next iteration
            console.log("continue to next iteration");
            break;
          }
        }
      } else {
        //? node have children -> add node to stack
        stack.push(newNode);
        console.log("have children adding to stack");
      }

      this._setNode(newNode);
      idx += jumpIdx;
    }
  }

  nodeList(): Map<id, Node> {
    return this.nodes;
  }
}
