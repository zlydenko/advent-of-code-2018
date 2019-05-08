//? BIT -> Binary Instructions Tree
export class BIT {
  head: BIT | null = this;
  private value: string;
  right: BIT | null = null;
  left: BIT[] | null = null;

  constructor(v: string) {
    this.value = v;
  }

  addInstructions(instructions: BIT): BIT {
    instructions._changeHead(this);

    if (this.left === null) {
      this.left = [instructions];
    } else if (this.left !== null && this.right === null) {
      this.right = instructions;
    } else if (this.left !== null && this.right !== null) {
      this.left = [...this.left, instructions];
    }

    this._balanceTree();

    return this;
  }

  private _changeHead(node: BIT): void {
    this.head = node;
  }

  private _balanceTree(): void {
    //? here we need move elements from right to left or vice versa
    //todo get all left and right nodes
    //todo sort the order alphabetically and change l/r
    const isThereRightBranch = this.right !== null;

    if (isThereRightBranch) {
      const nodes = this._flattenArr([this.left, this.right]).filter((node: BIT | null) => node !== null);
      nodes.sort((a: BIT, b: BIT) => a.value.charCodeAt(0) - b.value.charCodeAt(0));
      this.left = nodes.slice(0, -1);
      this.right = nodes.slice(-1)[0];
    } else {
      this.left = this.left && this.left.sort((a: BIT, b: BIT) => a.value.charCodeAt(0) - b.value.charCodeAt(0));
    }
  }

  private _flattenArr(values: any) {
    return values.reduce((acc: any[], val: any) => (Array.isArray(val) ? [...acc, ...val] : [...acc, val]), []);
  }

  toString(): string {
    let result = `Node ${this.value} have branches:
      on the left(${this.left === null ? '0' : this.left.length}): ${this.left !== null ? this.left.map(node => node.value).join(', ') : ''};
      on the right: ${this.right !== null ? this.right.value : ''}
      `;
    return result;
  }
}