import { ICodeTrace, INodes } from "@/types";
import { defineStore } from "pinia";

interface IState {
  BST: INodes;
  codeTrace: ICodeTrace;
  codeIndex: number;
}

export const useBSTStore = defineStore("bst", {
  state: (): IState => ({
    BST: {},
    codeTrace: {
      codes: [],
      traces: [],
    },
    codeIndex: 0,
  }),
  actions: {
    setBST(value: INodes) {
      this.BST = value;
    },
    setCodeTrace(value: ICodeTrace) {
      this.codeTrace = value;
    },
    setCodeIndex(value: number) {
      this.codeIndex = value;
    },
  },
});
