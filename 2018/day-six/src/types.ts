export type coords = {
  x: number;
  y: number;
};

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

export class SafeRegion {
  size: number = 0;
  maxDistance: number = 10000;

  increase(): void {
    this.size++;
  }

  _changeDistance(n: number) {
    this.maxDistance = n;
  }

  getMaxDistance(): number {
    return this.maxDistance;
  }

  getSize(): number {
    return this.size;
  }
}
