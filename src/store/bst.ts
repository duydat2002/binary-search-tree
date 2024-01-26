import { ICodeTrace, INodes, UINode } from "@/types";
import { defineStore } from "pinia";

interface IState {
  BST: INodes;
  node: Nullable<UINode>;
  codeTrace: ICodeTrace;
  codeStep: number;
  action: string;
}

export const useBSTStore = defineStore("bst", {
  state: (): IState => ({
    BST: {},
    node: null,
    codeTrace: {
      codes: [],
      traces: [],
    },
    codeStep: 0,
    action: "",
  }),
  actions: {
    setBST(value: INodes) {
      this.BST = value;
    },
    setNode(value: Nullable<UINode>) {
      this.node = value;
    },
    setCodeTrace(value: ICodeTrace) {
      this.codeTrace = value;
    },
    setCodeStep(value: number) {
      this.codeStep = value;
    },
    setAction(value: string) {
      this.action = value;
    },
  },
});
