type LeftBranch = InstructionsTree;
type RightBranch = InstructionsTree;

export class InstructionsTree {
  head: string | InstructionsTree;
  right: RightBranch | null = null;
  left: LeftBranch | null = null;

  constructor(v: string) {
    this.head = v;
  }

  addLeft(v: string) {
    const newTree = new InstructionsTree(v);
    this.left = newTree;

    return this;
  }

  addRight(v: string) {
    const newTree = new InstructionsTree(v);
    this.right = newTree;

    return this;
  }

  // showConnections(): string[] {
  //   const headValue = typeof this.head === 'string' ? this.head : '';
  //   const rightValue = this.right !== null ?
  //   (this.right.head instanceof InstructionsTree ?
  //     this.right.head.head :
  //   ) :
  //   '';
  //   const leftValue = this.left !== null ? this.left.head : '';

  //   return [`${headValue} => ${leftValue}`, `${headValue} => ${rightValue}`];
  // }
}
