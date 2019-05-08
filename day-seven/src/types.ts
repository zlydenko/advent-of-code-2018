export class Node {
  head: Node | null;
  value: string;
  next: Node | null;

  constructor(value: string) {
    this.value = value;
    this.head = null;
    this.next = null;
  }

  setHead(node: Node) {
    this.head = node;

    return this;
  }

  setNext(node: Node) {
    this.next = node;

    return this;
  }
}

export class InstructionsTree {}
