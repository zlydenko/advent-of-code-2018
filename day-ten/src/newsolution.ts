interface PointI {
  x: number;
  y: number;
}

class Coord implements PointI {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Velocity implements PointI {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Point {
  position: Coord;
  velocity: Velocity;

  constructor(startPos: Coord, velocity: Velocity) {
    this.position = startPos;
    this.velocity = velocity;
  }

  move(): void {
    this.position = {
      x: this.position.x + this.velocity.x,
      y: this.position.y + this.velocity.y
    };
  }
}

interface Size {
  width: number;
  height: number;
}

class Sky {
  points: Point[];
  currentTime: number = 0;
  size: Size;
  symbols = {
    point: '#',
    freespace: '.'
  };

  constructor(skySize: Size, points: Point[]) {
    this.size = skySize;
    this.points = points;
  }

  nextTick(): void {
    this.currentTime++;
    this.points.forEach(point => point.move());
  }

  display(): void {
    let result = [];
    for (let i = 0; i < this.size.height; i++) {
      let row = [];
      for (let j = 0; j < this.size.width; j++) {}
    }
  }
}
