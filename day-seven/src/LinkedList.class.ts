export class LinkedListNode {
  value: any;
  next: LinkedListNode | null;

  constructor(value: any, next: LinkedListNode | null = null) {
    this.value = value;
    this.next = next;
  }

  toString(cb?: Function) {
    return cb ? cb(this.value) : this.value;
  }
}

export default class LinkedList {
  head: LinkedListNode | null;
  tail: LinkedListNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  appendNode(value: any): LinkedList {
    const node = new LinkedListNode(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    }

    if (this.tail) {
      this.tail.next = node;
      this.tail = node;
    }

    return this;
  }

  prependNode(value: any): LinkedList {
    const node = new LinkedListNode(value, this.head);
    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

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

    return this;
  }
}
