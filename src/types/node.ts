import { IPoint } from ".";

export interface INode {
  value: number;
  position: IPoint;
  count?: number;
}
