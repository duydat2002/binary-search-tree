import { defineStore } from "pinia";

interface IState {
  bstWidth: number;
}

export const useCommonStore = defineStore("common", {
  state: (): IState => ({
    bstWidth: 0,
  }),
  actions: {
    setBstWidth(value: number) {
      this.bstWidth = value;
    },
  },
});
