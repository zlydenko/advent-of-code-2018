export interface Coordinates {
  x: number;
  y: number;
}

export interface Slice {
  id: number;
  coords: Coordinates[];
}

export interface ParsedSliceInfo {
  count: number;
  id: string[];
}
