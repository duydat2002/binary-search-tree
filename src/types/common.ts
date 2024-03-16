export interface IPoint {
  x: number;
  y: number;
}

export interface IPosition {
  clientX: number | null;
  clientY: number | null;
  movementX: number;
  movementY: number;
}

export type TExtend =
  | "Create"
  | "Search"
  | "Insert"
  | "Remove"
  | "Traverse"
  | "Predec-/Succ-essor"
  | "FindNodeAtRank"
  | "FindNode'sRank"
  | "FindNode'sLevel";
