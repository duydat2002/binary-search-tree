import { UILine, UINode } from ".";

export interface ICodeTrace {
  codes: string[];
  traces: ITrace[];
}

export interface ITrace {
  status: string;
  codeIndex: Nullable<number>;
  nodes: { [key: string]: Nullable<UINode> };
  lines: { [key: string]: Nullable<UILine> };
}
