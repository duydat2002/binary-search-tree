import { defineStore } from "pinia";

interface IState {
  isPlay: boolean;
  isShowStatus: boolean;
  isShowTrace: boolean;
}

export const useControllerStore = defineStore("controller", {
  state: (): IState => ({
    isPlay: false,
    isShowStatus: false,
    isShowTrace: false,
  }),
  actions: {},
});
