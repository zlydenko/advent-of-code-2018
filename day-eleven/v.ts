class ChronalChargeV {
  public grid: number[] = [];

  constructor(private serialNumber: number) {}

  private getHundredDigit(n: number): number {
    const remainder = n % 100;
    const wholeNumber = n - remainder;

    if (wholeNumber === 0) return 0;

    const divided = wholeNumber / 100;
    const dividedStr = String(divided);
    const lastDigit = Number(dividedStr[dividedStr.length - 1]);

    return lastDigit;
  }

  private calculatePowerLevel([x, y]: [number, number]): number {
    const rackId = x + 10;
    const powerLvl = (rackId * y + this.serialNumber) * rackId;
    const hundred = this.getHundredDigit(powerLvl);

    return hundred - 5;
  }

  private createGrid() {
    this.grid = Array(89401)
      .fill(null)
      .map((_, idx) => {
        const x = (idx % 299) + 1;
        const y = (idx - (idx % 299)) / 299 + 1;
        const powerLvl = this.calculatePowerLevel([x, y]);

        return powerLvl;
      });
  }

  public result() {
    this.createGrid();

    console.log(this.grid);
  }
}

const huy = new ChronalChargeV(2866);
huy.result();
