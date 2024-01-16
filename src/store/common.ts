import { defineStore } from "pinia";

interface IState {
  bstWidth: number;
  speed: number;
}

export const useCommonStore = defineStore("common", {
  state: (): IState => ({
    bstWidth: 0,
    speed: 1,
  }),
  actions: {
    setBstWidth(value: number) {
      this.bstWidth = value;
    },
    setSpeed(value: number) {
      this.speed = value;
    },
  },
});
