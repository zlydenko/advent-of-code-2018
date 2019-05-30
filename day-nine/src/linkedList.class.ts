/*
  related: https://github.com/trekhleb/javascript-algorithms/blob/master/src/data-structures/doubly-linked-list/DoublyLinkedList.js
*/

export class ListNode<T> {
  prev: ListNode<T> | null = null;
  next: ListNode<T> | null = null;
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  setNext(node: ListNode<T>): ListNode<T> {
    this.next = node;
    return this;
  }

  deleteNext(): ListNode<T> {
    this.next = null;
    return this;
  }

  setPrev(node: ListNode<T>): ListNode<T> {
    this.prev = node;
    return this;
  }

  deletePrev(): ListNode<T> {
    this.prev = null;
    return this;
  }

  haveNext(): boolean {
    return this.next !== null;
  }

  havePrev(): boolean {
    return this.prev !== null;
  }
}

export default class LinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;

  constructor(head?: T) {
    if (head !== undefined) {
      const node = new ListNode<T>(head);
      this.head = node;
      this.tail = node;
    }
  }

  appendNode(value: T): LinkedList<T> {
    const newNode = new ListNode(value);
    const currentTail = this.tail;
    const currentHead = this.head;

    if (!currentTail || !currentHead) {
      if (!currentTail) this.tail = newNode;
      if (!currentHead) this.head = newNode;
    } else {
      currentTail.setNext(newNode);
      newNode.setPrev(currentTail);
      this.tail = newNode;
    }

    return this;
  }

  prependNode(value: T): LinkedList<T> {
    const newNode = new ListNode(value);
    const head = this.head;
    const tail = this.tail;

    if (!head || !tail) {
      if (!head) this.head = newNode;
      if (!tail) this.tail = newNode;
    } else {
      newNode.setNext(head);
      head.setPrev(newNode);
      this.head = newNode;
    }

    return this;
  }

  findNode(value: T): ListNode<T> | undefined {
    if (this.head && this.head.value === value) return this.head;
    if (this.tail && this.tail.value === value) return this.tail;

    let currentNode = this.head;

    while (true) {
      if (currentNode && currentNode.value === value) {
        break;
      } else {
        if (currentNode && currentNode.next !== null) {
          currentNode = currentNode.next;
        } else {
          return undefined;
        }
      }
    }

    return currentNode;
  }

  insertBetween(value: T, nodeBefore?: ListNode<T>, nodeAfter?: ListNode<T>, valueBefore?: T, valueAfter?: T): LinkedList<T> {
    const newNode = new ListNode(value);

    if (nodeBefore && nodeAfter && nodeBefore === nodeAfter) {
      const node = nodeBefore;

      newNode.setPrev(node);
      node.setNext(newNode);
      this.tail = newNode;

      return this;
    }

    if (valueBefore && valueAfter && valueBefore === valueAfter) {
      const node = this.findNode(valueBefore);

      if (node) {
        newNode.setPrev(node);
        node.setNext(newNode);
        this.tail = newNode;
      }

      return this;
    }

    //? find value before and set to temp var
    const beforeNode = valueBefore ? this.findNode(valueBefore) : nodeBefore;
    //? find value after and set to temp var
    const afterNode = valueAfter ? this.findNode(valueAfter) : nodeAfter;

    if (beforeNode && afterNode) {
      //? set after value to new node next
      newNode.setNext(afterNode);
      afterNode.setPrev(newNode);
      //? set new node to before value next
      beforeNode.setNext(newNode);
      newNode.setPrev(beforeNode);
    } else {
      throw new Error('oops');
    }

    return this;
  }

  lastNode(): ListNode<T> | null {
    return this.tail;
  }

  makeStepsClockwise(value: T, stepsCount: number): ListNode<T> {
    const node = this.findNode(value);

    if (!node) throw new Error('node not found');

    if (!this.head || !this.tail) throw new Error('empty list');

    let currentNode = node;
    let steps = 0;

    while (steps < stepsCount) {
      if (currentNode.next === null) {
        currentNode = this.head;
      } else {
        currentNode = currentNode.next;
      }
      steps++;
    }

    return currentNode;
  }

  makeStepsCounterClockwise(value: T, stepsCount: number): ListNode<T> {
    const node = this.findNode(value);

    if (!node) throw new Error('node not found');

    if (!this.head || !this.tail) throw new Error('empty list');

    let currentNode = node;
    let steps = 0;

    while (steps < stepsCount) {
      if (currentNode.prev === null) {
        currentNode = this.tail;
      } else {
        currentNode = currentNode.prev;
      }
      steps++;
    }
    return currentNode;
  }

  deleteNode(node?: ListNode<T>, value?: T): LinkedList<T> {
    if (!this.head || !this.tail) {
      throw new Error('empty list');
    }

    if ((node !== undefined && node === this.head) || (value !== undefined && value === this.head.value)) {
      const nextNode = this.head.next;

      if (nextNode === null) {
        this.head = null;
        this.tail = null;
      } else {
        nextNode.deletePrev();
        this.head = nextNode;
      }
    } else if ((node !== undefined && node === this.tail) || (value !== undefined && value === this.tail.value)) {
      const prevNode = this.tail.prev;

      if (!prevNode) {
        this.head = null;
        this.tail = null;
      } else {
        prevNode.deleteNext();
        this.tail = prevNode;
      }
    } else {
      const deleteNode = value ? this.findNode(value) : node;

      if (deleteNode !== undefined) {
        const prevNode = deleteNode.prev;
        const nextNode = deleteNode.next;

        if (prevNode === null || nextNode === null) {
          throw new Error('oops');
        } else {
          prevNode.setNext(nextNode);
          nextNode.setPrev(prevNode);
        }
      }
    }

    return this;
  }

  toArray(): Array<T> {
    let currentNode: ListNode<T> | null = this.head;
    let result = new Array();

    while (currentNode) {
      result.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return result;
  }

  toString(): string {
    return this.toArray().join(',');
  }
}
