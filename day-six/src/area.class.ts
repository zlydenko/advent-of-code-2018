import { coords } from "./solution-pt1";

export class Area {
  size: number = 0;
  infinite: boolean = false;
  origin: coords;

  constructor(center: coords) {
    this.origin = center;
  }

  increase() {
    this.size += 1;
  }

  isInfinite() {
    this.infinite = true;
  }

  info() {
    return this;
  }
}
