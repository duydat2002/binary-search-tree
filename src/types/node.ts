import BSTNode from "@/composables/Node";
import { IPoint } from ".";

export interface INode extends BSTNode {
  rank: number;
  level: number;
  position: IPoint;
}

// export interface INode {
//   value: number;
//   quantity: number;
//   left: Nullable<number>;
//   right: Nullable<number>;
//   parent: Nullable<number>;
//   leftSize: number;
//   rank: number;
//   level: number;
//   position: IPoint;
// }
