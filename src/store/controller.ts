import { defineStore } from "pinia";

interface IState {
  isPlay: boolean;
}

export const useControllerStore = defineStore("controller", {
  state: (): IState => ({
    isPlay: false,
  }),
  actions: {},
});
