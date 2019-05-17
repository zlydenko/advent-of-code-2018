export interface TreeI {
  header: [number, number];
  childNodes: Array<Node>;
  metadataEntries: Array<number>;
}

//? subtree

export interface NodeI extends TreeI {}

export class Tree implements TreeI {
  header: [number, number];
  childNodes: Array<Node> = [];
  metadataEntries: Array<number> = [];
  data: number[];

  constructor(data: number[]) {
    const [childNodesQuantity, metadataEntriesQuantity, ...childrenInfo] = data;
    const metadataEntries = childrenInfo.slice(-metadataEntriesQuantity);
    const childrenData = childrenInfo.slice(0, -metadataEntriesQuantity);

    this.header = [childNodesQuantity, metadataEntriesQuantity];
    this.metadataEntries = metadataEntries;
    this.data = childrenData;

    if (this.header[0] > 0) this._createChildren();
  }

  private _createChildren(): void {}
}

export class Node extends Tree {}
