import LinkedList, { ListNode } from '../linkedList.class';

describe('list node', () => {
  test('check if have next', () => {
    const node = new ListNode('s');
    const nextNode = new ListNode('v');

    expect(node.haveNext()).toBe(false);
    node.setNext(nextNode);
    expect(node.haveNext()).toBe(true);
  });

  test('check if have prev', () => {
    const node = new ListNode('s');
    const prevNode = new ListNode('v');

    expect(node.havePrev()).toBe(false);
    node.setPrev(prevNode);
    expect(node.havePrev()).toBe(true);
  });
});

describe('linked list', () => {
  test('create instance of linked list', () => {
    const list = new LinkedList('test');
    expect(list).toBeDefined();
    expect(list).toBeInstanceOf(LinkedList);
  });
  test('appending node', () => {
    const list = new LinkedList('head');
    const appendingValue = 'test';
    list.appendNode(appendingValue);
    list.head && expect(list.head.next).not.toBeNull();
    list.head && list.head.next && expect(list.head.next.value).toBe(appendingValue);
  });
  test('prepending node', () => {
    const value = 'head';
    const list = new LinkedList(value);
    const prependingValue = 'newhead';
    list.prependNode(prependingValue);
    list.head && expect(list.head.next).not.toBeNull();
    list.head && list.head.next && expect(list.head.next.value).toBe(value);
  });
  test('find node', () => {
    const value = 'head';
    const list = new LinkedList(value);
    const findNode = list.findNode(value);
    findNode && expect(findNode.value).toBe(value);
  });
  test('find node', () => {
    const list = new LinkedList('head');
    list.appendNode('first');
    list.appendNode('second');
    list.appendNode('third');
    const findNode = list.findNode('second');
    findNode && findNode.next && expect(findNode.next.value).toBe('third');
  });
  test('find node', () => {
    const list = new LinkedList('head');
    list.appendNode('first');
    const findNode = list.findNode('first');
    findNode && expect(findNode.value).toBe('first');
  });
  test('get last node', () => {
    const list = new LinkedList('head');
    list.appendNode('first');
    list.appendNode('second');
    list.appendNode('third');
    const lastNode = list.lastNode();
    expect(lastNode).not.toBeNull();
    lastNode && expect(lastNode.value).toBe('third');
  });
  test('insert node between nodes', () => {
    const list = new LinkedList('head');
    list.appendNode('first');
    list.appendNode('second');
    list.appendNode('third');
    const secondNode = list.findNode('second');
    const thirdNode = list.findNode('third');
    if (secondNode === undefined || thirdNode === undefined) {
      throw 'no nodes';
    }
    list.insertBetween('boom', secondNode, thirdNode);
    const lastNode = list.lastNode();
    lastNode && expect(lastNode.prev && lastNode.prev.value).toBe('boom');
  });
  test('insert node between nodes', () => {
    const list = new LinkedList(0);
    const node = list.findNode(0);
    if (node === undefined) {
      throw 'node not found';
    }
    list.insertBetween(1, node, node);
    const lastNode = list.lastNode();
    lastNode && expect(lastNode.value).toBe(1);
  });
  test('make steps clockwise', () => {
    const list = new LinkedList(0);
    list.appendNode(1);
    const node = list.makeStepsClockwise(1, 2);
    expect(node.value).toBe(1);
  });
  test('make steps clockwise', () => {
    const list = new LinkedList(0);
    const node = list.makeStepsClockwise(0, 2);
    expect(node.value).toBe(0);
  });
  test('make steps counterclockwise', () => {
    const list = new LinkedList(0);
    list.appendNode(1);
    list.appendNode(2);
    const node = list.makeStepsCounterClockwise(0, 5);
    expect(node.value).toBe(1);
  });
  test('output list to string', () => {
    const list = new LinkedList(0);
    list.appendNode(1);
    list.appendNode(2);
    const listStr = list.toString();
    expect(listStr).toBe('0,1,2');
  });
  test('delete head by node', () => {
    const list = new LinkedList(0);
    const node = list.findNode(0);
    expect(node).toBeDefined();
    list.deleteNode(node);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    list.appendNode(1);
    list.appendNode(2);
    const newHead = list.findNode(1);
    expect(newHead).toBeDefined();
    list.deleteNode(newHead);
    expect(list.head).not.toBeNull();
    list.head && expect(list.head.value).toBe(2);
    list.tail && expect(list.tail.value).toBe(2);
  });
  test('delete tail by node', () => {
    const list = new LinkedList(0);
    list.appendNode(1);
    list.appendNode(2);
    const node = list.findNode(2);
    expect(node).toBeDefined();
    list.deleteNode(node);
    list.tail && expect(list.tail.value).toBe(1);
  });
  test('delete node by node', () => {
    const list = new LinkedList(0);
    list.appendNode(1);
    list.appendNode(2);
    const node = list.findNode(1);
    expect(node).toBeDefined();
    list.deleteNode(node);
    list.head && expect(list.head.value).toBe(0);
    list.head && list.head.next && expect(list.head.next.value).toBe(2);
    list.tail && expect(list.tail.value).toBe(2);
  });
  test('delete head by value', () => {
    const list = new LinkedList(0);
    list.deleteNode(undefined, 0);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
    list.appendNode(1);
    list.appendNode(2);
    list.deleteNode(undefined, 1);
    expect(list.head).not.toBeNull();
    list.head && expect(list.head.value).toBe(2);
    list.tail && expect(list.tail.value).toBe(2);
  });
  test('delete tail by value', () => {
    const list = new LinkedList(0);
    list.appendNode(1);
    list.appendNode(2);
    list.deleteNode(undefined, 2);
    list.tail && expect(list.tail.value).toBe(1);
  });
  test('delete node by value', () => {
    const list = new LinkedList(0);
    list.appendNode(1);
    list.appendNode(2);
    list.deleteNode(undefined, 1);
    list.head && expect(list.head.value).toBe(0);
    list.head && list.head.next && expect(list.head.next.value).toBe(2);
    list.tail && expect(list.tail.value).toBe(2);
  });
});
