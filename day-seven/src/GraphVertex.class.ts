//? graph vertex A
//? graph vertex B
export default class GraphVertex {
  private value: string;

  constructor(value?: string) {
    if (value) {
      this.value = value;
    } else {
      throw new Error("you must specify value of vertex");
    }
  }

  toString() {
    return this.value;
  }
}
