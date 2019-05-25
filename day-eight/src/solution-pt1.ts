// import nanoid from 'nanoid';

export class Node {
  private header: [number, number];
  private metadata: number[] = [];
  private children: Node[] = [];
  isFulfilled: boolean = false;

  constructor(h: [number, number]) {
    this.header = h;
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

  addChild(node: Node): Node {
    this.children.push(node);
    this._checkIsFulfilled();

    return this;
  }

  getChildren(): Node[] {
    return this.children;
  }
}
