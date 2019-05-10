import LinkedList from './LinkedList.class';

//? after 30 minutes of implementation I realize we can create Stack class without Linked list. Nice.
export default class Stack {
  private store: LinkedList;

  constructor() {
    this.store = new LinkedList();
  }

  getValues(): Array<any> {
    let currentNode = this.store.head;
    let result = [];

    while (currentNode) {
      result.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return result;
  }

  push(e: any): Stack {
    this.store.prependNode(e);

    return this;
  }

  pop(): any {
    const node = this.store.head;

    if (node) {
      const value = node.value;
      this.store.deleteNode((v: any) => v === node.value);
      return value;
    }

    return null;
  }

  size(): number {
    return this.store.length();
  }

  isEmpty(): boolean {
    return this.store.isEmpty();
  }
}
