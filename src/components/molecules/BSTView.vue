<script lang="ts" setup>
import UILine from "../Atom/UILine.vue";
import UINode from "../Atom/UINode.vue";

import { ref, computed, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useBSTStore } from "@/store";

const { codeTrace, codeStep } = storeToRefs(useBSTStore());

const isDrag = ref(false);
const scale = ref(1);
const mousePosition = ref({ x: 0, y: 0 });
const mouseDownPosition = ref({ x: 0, y: 0 });
const translate = ref({ x: 0, y: 0 });

const boxStyle = computed(() => {
  return {
    transform: `scale(${scale.value}) translate(${translate.value.x}px, ${translate.value.y}px)`,
  };
});

const nodes = computed(() => {
  return codeTrace.value.traces[codeStep.value]?.nodes;
});
const lines = computed(() => {
  return codeTrace.value.traces[codeStep.value]?.lines;
});

const onWheel = (e: WheelEvent) => {
  scale.value -= (e.deltaY * 0.05) / 100;
};

const onMouseDown = (e: MouseEvent) => {
  isDrag.value = true;
  mousePosition.value.x = e.clientX;
  mousePosition.value.y = e.clientY;

  mouseDownPosition.value.x = translate.value.x;
  mouseDownPosition.value.y = translate.value.y;
};

const onMouseMove = (e: MouseEvent) => {
  if (isDrag.value) {
    translate.value.x = mouseDownPosition.value.x + (e.clientX - mousePosition.value.x) / 2;
    translate.value.y = mouseDownPosition.value.y + (e.clientY - mousePosition.value.y) / 2;
  }
};

const onMouseUp = () => {
  isDrag.value = false;
};

onMounted(() => {});
</script>

<template>
  <div
    class="container"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMouseMove"
    @wheel="onWheel"
  >
    <div id="box" :class="{ isDrag }" :style="boxStyle">
      <svg width="10000" height="10000" viewBox="0 0 10000 10000" fill="currentColor">
        <g>
          <g id="line">
            <UILine v-if="lines" v-for="line in lines" :key="line!.key" :line="line!" />
          </g>
          <g id="node">
            <UINode v-if="nodes" v-for="node in nodes" :key="node!.value" :node="node!" />
          </g>
          <g id="text"></g>
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.container {
  overflow: hidden;
  padding: 40px;
}

#box {
  transform-origin: top left;
  transition: all 0.5s;
  user-select: none;
  cursor: default;
  backface-visibility: hidden;
}

#box.isDrag {
  transition: none;
  cursor: grabbing;
}
</style>
