export class LinkedListNode {
  value: any;
  next: LinkedListNode | null = null;

  constructor(value: any) {
    this.value = value;
  }

  setNext(node: LinkedListNode) {
    this.next = node;
  }

  toString(cb?: Function) {
    return cb ? cb(this.value) : this.value;
  }
}

export default class LinkedList {
  head: LinkedListNode | null = null;
  tail: LinkedListNode | null = null;
  private size: number = 0;

  constructor(initialValue?: any) {
    if (initialValue) {
      const node = new LinkedListNode(initialValue);
      this.head = node;
      this.tail = node;
      this.size = 1;
    }
  }

  appendNode(value: any): LinkedList {
    const node = new LinkedListNode(value);

    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail && this.tail.setNext(node);
      this.tail = node;
    }

    this.size++;

    return this;
  }

  prependNode(value: any): LinkedList {
    if (this.head) {
      const node = new LinkedListNode(value);
      node.setNext(this.head);
      this.head = node;

      if (!this.tail) {
        this.tail = node;
      }
    } else {
      const node = new LinkedListNode(value);
      this.head = node;
      this.tail = node;
    }

    this.size++;

    return this;
  }

  deleteNode(compareFn: Function): LinkedList {
    if (!this.head || !this.tail) {
      throw new Error('linked list is empty');
    }

    let deletedNode = null;

    while (this.head && compareFn(this.head.value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      while (currentNode.next) {
        if (compareFn(currentNode.next.value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (compareFn(this.tail.value)) {
      this.tail = currentNode;
    }

    this.size--;

    return this;
  }

  length(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }
}
