export interface IPoint {
  x: number;
  y: number;
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
  | "FindNote'sLevel";
