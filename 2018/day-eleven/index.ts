class ChronalCharge {
  public grid: Map<string, number> = new Map();

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
    this.grid = new Map(
      Array(89401)
        .fill(null)
        .map((_, idx) => {
          const x = (idx % 299) + 1;
          const y = (idx - (idx % 299)) / 299 + 1;
          const powerLvl = this.calculatePowerLevel([x, y]);

          return [`${x},${y}`, powerLvl];
        })
    );
  }

  public calculate3x3GridForTopLeftValue(coordinates: string): number {
    const [x, y]: number[] = coordinates.split(",").map(n => Number(n));
    const value11 = this.grid.get(`${x},${y}`) || 0;
    const value21 = this.grid.get(`${x + 1},${y}`) || 0;
    const value31 = this.grid.get(`${x + 2},${y}`) || 0;
    const value12 = this.grid.get(`${x},${y + 1}`) || 0;
    const value22 = this.grid.get(`${x + 1},${y + 1}`) || 0;
    const value32 = this.grid.get(`${x + 2},${y + 1}`) || 0;
    const value13 = this.grid.get(`${x},${y + 2}`) || 0;
    const value23 = this.grid.get(`${x + 1},${y + 2}`) || 0;
    const value33 = this.grid.get(`${x + 2},${y + 2}`) || 0;
    const firstRow = value11 + value21 + value31;
    const secondRow = value12 + value22 + value32;
    const thirdRow = value13 + value23 + value33;

    return firstRow + secondRow + thirdRow;
  }

  public gridReducer(
    acc: {
      value: number;
      coordinates: string;
    },
    value: [string, number]
  ): {
    value: number;
    coordinates: string;
  } {
    const { value: accValue } = acc;
    const [coordinates, _] = value;
    const result = this.calculate3x3GridForTopLeftValue(coordinates);

    return result > accValue
      ? {
          value: result,
          coordinates
        }
      : acc;
  }

  public result(): {
    value: number;
    topLeftCoordinate: string;
  } {
    this.createGrid();
    const { value, coordinates: topLeftCoordinate } = Array.from(this.grid).reduce(
      (
        acc: {
          value: number;
          coordinates: string;
        },
        value: [string, number]
      ) => {
        const { value: accValue } = acc;
        const [coordinates, _] = value;
        const result = this.calculate3x3GridForTopLeftValue(coordinates);

        return result > accValue
          ? {
              value: result,
              coordinates
            }
          : acc;
      },
      {
        value: 0,
        coordinates: ""
      }
    );

    return {
      value,
      topLeftCoordinate
    };
  }
}

const x = new ChronalCharge(2866);
const res = x.result();
console.log(res);
