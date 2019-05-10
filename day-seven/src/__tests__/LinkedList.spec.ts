import LinkedList from '../LinkedList.class';

describe('Linked List', () => {
  test('create empty linked list', () => {
    const ll = new LinkedList();

    expect(ll).toBeDefined();
    expect(ll).toBeInstanceOf(LinkedList);
  });

  test('append elements to linked list', () => {
    const elements = ['a', 'b', 'c', 'd'];
    const list = new LinkedList();

    elements.forEach(elem => list.appendNode(elem));

    if (list.head && list.tail) {
      expect(list.head.value).toBe('a');
      expect(list.tail.value).toBe('d');
    } else {
      throw new Error('failed to append elements to list');
    }
  });

  test('prepend elements to linked list', () => {
    const elements = ['b', 'c', 'd'];
    const list = new LinkedList();

    list.appendNode('a');

    elements.forEach(elem => list.prependNode(elem));

    if (list.head && list.tail) {
      expect(list.head.value).toBe('d');
      expect(list.tail.value).toBe('a');
    } else {
      throw new Error('failed to prepend elements to list');
    }
  });

  test('delete nodes from linked list', () => {
    const elements = ['a', 'b', 'c', 'd'];
    const list = new LinkedList();

    elements.forEach(elem => list.appendNode(elem));

    if (list.head && list.tail) {
      list
        .deleteNode((x: any) => x === 'c')
        .deleteNode((x: any) => x === 'a')
        .deleteNode((x: any) => x === 'd');

      expect(list.head.value).toBe('b');
      expect(list.tail.value).toBe('b');
    } else {
      throw new Error('failed to delete elements to list');
    }
  });
});
