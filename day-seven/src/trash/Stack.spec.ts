import Stack from '../Stack.class';

describe('Stack', () => {
  test('create empty stack', () => {
    const stack = new Stack();

    expect(stack).toBeDefined();
    expect(stack).toBeInstanceOf(Stack);
  });

  test('get values of stack', () => {
    const stack = new Stack();

    expect(stack.getValues()).toHaveLength(0);
  });

  test('push element to stack', () => {
    const stack = new Stack();
    const expected = ['A', 'B'];

    stack.push('A');
    stack.push('B');

    const output = stack.getValues();

    expect(output[0]).toBe(expected[1]);
    expect(output[1]).toBe(expected[0]);
  });

  test('pop element from stack', () => {
    const stack = new Stack();

    stack.push('A');
    stack.push('B');
    stack.push('C');

    const firstElem = stack.pop();
    const secondElem = stack.pop();
    const thirdElem = stack.pop();

    expect(stack.getValues()).toHaveLength(0);
    expect(firstElem).toBe('C');
    expect(secondElem).toBe('B');
    expect(thirdElem).toBe('A');
  });

  test('show stack size', () => {
    const stack = new Stack();

    stack.push('A');
    stack.push('B');

    expect(stack.size()).toBe(2);

    stack.pop();
    stack.pop();

    expect(stack.size()).toBe(0);
  });

  test('show if stack is empty', () => {
    const stack = new Stack();

    stack.push('A');
    stack.push('B');

    expect(stack.isEmpty()).toBe(false);

    stack.pop();
    stack.pop();

    expect(stack.isEmpty()).toBe(true);
  });
});
