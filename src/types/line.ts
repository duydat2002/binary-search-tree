import { INode, UINode } from ".";

export interface ILine {
  start: INode;
  end: INode;
}

export interface UILine {
  start: UINode;
  end: UINode;
  key: string;
  isShow?: boolean;
  isTraver?: boolean;
}
