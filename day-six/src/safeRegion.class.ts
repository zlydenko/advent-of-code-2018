export class SafeRegion {
  size: number = 0;
  maxDistance: number = 10000;

  increase(): void {
    this.size++;
  }

  getMaxDistance(): number {
    return this.maxDistance;
  }

  getSize(): number {
    return this.size;
  }
}
