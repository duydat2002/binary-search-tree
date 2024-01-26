<script lang="ts" setup>
import BackwardIcon from "@icons/backward.svg";
import PreviousIcon from "@icons/previous.svg";
import PauseIcon from "@icons/pause.svg";
import PlayIcon from "@icons/play.svg";
import ReplayIcon from "@icons/replay.svg";
import NextIcon from "@icons/next.svg";
import ForwardIcon from "@icons/forward.svg";
import InputRange from "@/components/Atom/InputRange.vue";
import BSTView from "@/components/Molecules/BSTView.vue";
import TraceView from "@/components/Molecules/TraceView.vue";
import Controller from "@/components/Molecules/Controller.vue";

import { ref, computed, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useBSTStore, useControllerStore } from "@/store";
import NodeInfo from "../Molecules/NodeInfo.vue";

const { codeTrace, codeStep } = storeToRefs(useBSTStore());
const { isPlay } = storeToRefs(useControllerStore());

const speed = ref(1);
const intevalId = ref();

const traceLength = computed(() => {
  return codeTrace.value.traces.length - 1;
});

const playTrace = (speed: number) => {
  clearInterval(intevalId.value);

  intevalId.value = setInterval(() => {
    if (codeStep.value >= traceLength.value) {
      isPlay.value = false;
    } else {
      codeStep.value += 1;
    }
  }, 1500 / speed);
};

const goToStart = () => {
  codeStep.value = 0;
};

const goToEnd = () => {
  codeStep.value = traceLength.value;
};

const previous = () => {
  isPlay.value = false;
  if (codeStep.value <= 0) codeStep.value = 0;
  else codeStep.value -= 1;
};

const next = () => {
  isPlay.value = false;
  if (codeStep.value >= traceLength.value) codeStep.value = traceLength.value;
  else codeStep.value += 1;
};

const play = () => {
  isPlay.value = true;
};

const pause = () => {
  isPlay.value = false;
};

const replay = () => {
  codeStep.value = 0;
  isPlay.value = true;
};

const onKeyPress = (e: KeyboardEvent) => {
  switch (e.code) {
    case "ArrowLeft":
      previous();
      break;
    case "ArrowRight":
      next();
      break;
    case "Space":
      if (isPlay.value) pause();
      else play();
      break;
  }
};

watch(speed, (newSpeed) => {
  clearInterval(intevalId.value);
  if (isPlay.value) playTrace(newSpeed);
});

watch(isPlay, (isPlay) => {
  if (isPlay) {
    playTrace(speed.value);
  } else {
    clearInterval(intevalId.value);
  }
});

onMounted(() => {
  window.addEventListener("keydown", onKeyPress);
});
</script>

<template>
  <div id="main">
    <Controller />
    <TraceView />
    <BSTView />
    <NodeInfo />
    <div class="bottom-bar">
      <div class="speed">
        <InputRange v-model:propValue.number="speed" :min="1" />
        <span>{{ speed }}x</span>
      </div>
      <div class="controls" :class="{ disable: traceLength <= 0 }">
        <div class="actions">
          <div class="icon" @click="goToStart"><BackwardIcon /></div>
          <div class="icon" @click="previous"><PreviousIcon /></div>
          <div class="icon icon-center">
            <ReplayIcon
              v-if="codeTrace.codes.length > 0 && codeStep >= traceLength"
              @click="replay"
              style="width: 20px"
            />
            <PauseIcon v-else-if="isPlay" @click="pause" />
            <PlayIcon v-else @click="play" />
          </div>
          <div class="icon" @click="next"><NextIcon /></div>
          <div class="icon" @click="goToEnd"><ForwardIcon /></div>
        </div>
        <div class="progress">
          <InputRange v-model:propValue.number="codeStep" :max="traceLength" />
          <span>{{ traceLength > 0 ? `${codeStep + 1}/${traceLength + 1}` : `0/0` }}</span>
        </div>
      </div>
      <div class="about"></div>
    </div>
  </div>
</template>

<style scoped>
#main {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000;
  padding: 15px 40px;
  color: #fff;
  user-select: none;
}

.speed {
  display: flex;
  align-items: center;
}

.speed span {
  margin-left: 5px;
}

.controls {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  z-index: -1;
  pointer-events: all;
}

.controls.disable {
  pointer-events: none;
}

.actions {
  display: flex;
  justify-content: space-between;
}

.actions .icon {
  width: 12px;
  fill: #bdbdbd;
  margin: 0 8px;
  transition: all 0.2s;
  cursor: pointer;
}

.actions .icon:hover {
  fill: #fff;
}

.actions .icon svg {
  width: 100%;
  height: 100%;
}

.actions .icon-center {
  fill: #fff;
  width: 16px;
}

.progress {
  width: 100%;
  max-width: 400px;
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.progress span {
  margin-left: 10px;
}
</style>
