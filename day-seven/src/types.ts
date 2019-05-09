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

  getValue(): string {
    return this.value;
  }

  toString(): string {
    //? take value
    let str = this.value;
    //? traverse through all left first
    if (this.left) {
      this.left.forEach(leftNode => {
        if (!leftNode.isLastNode()) {
          str += leftNode.toString();
        }
      });
    }

    if (this.right) {
      if (!this.right.isLastNode()) {
        //? add right value
        str += this.right.toString();
      }
    }

    return str;
  }

  isStartNode(): boolean {
    if (this.head !== null) {
      return this.value === this.head.value;
    } else {
      throw new Error('something went wrong');
    }
  }

  isLastNode(): boolean {
    return this.right === null && this.left === null;
  }
}
