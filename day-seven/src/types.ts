export class Node {
  value: string;
  next: Node | null;

  constructor(value: string, next: Node | null = null) {
    this.value = value;
    this.next = next;
  }
}
