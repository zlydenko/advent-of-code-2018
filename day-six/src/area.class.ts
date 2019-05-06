import { coords } from "./solution-pt1";

export class Area {
  size: number = 1;
  infinite: boolean = false;
  origin: coords;

  constructor(center: coords) {
    this.origin = center;
  }

  increase(n: number | null = null) {
    n === null ? this.size++ : (this.size += n);
  }

  isInfinite() {
    this.infinite = true;
  }

  info() {
    return this;
  }
}
