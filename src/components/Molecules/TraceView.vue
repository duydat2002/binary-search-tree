<script lang="ts" setup>
import LeftIcon from "@icons/left.svg";

import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useBSTStore, useControllerStore } from "@/store";

const { codeTrace, codeStep, action } = storeToRefs(useBSTStore());
const { isShowStatus, isShowTrace } = storeToRefs(useControllerStore());

const bstInfo = computed(() => {
  const nodeCount = codeTrace.value.traces[codeStep.value]?.nodeCount;
  const height = codeTrace.value.traces[codeStep.value]?.height;

  return !nodeCount ? "N=0, h=0 (Empty BST)" : `N=${nodeCount}, h=${height}`;
});

const status = computed(() => {
  const trace = codeTrace.value.traces[codeStep.value];
  return trace ? trace.status : "";
});

const codes = computed(() => {
  return codeTrace.value.codes;
});

const codeIndex = computed(() => {
  return codeTrace.value.traces[codeStep.value].codeIndex;
});

const toggleStatus = () => {
  isShowStatus.value = !isShowStatus.value;
};

const toggleTrace = () => {
  isShowTrace.value = !isShowTrace.value;
};
</script>

<template>
  <div class="section">
    <div class="info-container">
      <span>{{ bstInfo }}</span>
    </div>
    <div class="action-container">
      <span>{{ action }}</span>
    </div>
    <div class="status-container container" :class="{ active: isShowStatus }">
      <div class="toggle" @click="toggleStatus">
        <LeftIcon class="icon" />
      </div>
      <div class="content">
        <span v-html="status"></span>
      </div>
    </div>
    <div class="trace-container container" :class="{ active: isShowTrace }">
      <div class="toggle" @click="toggleTrace">
        <LeftIcon class="icon" />
      </div>
      <div class="content">
        <span
          v-for="(code, index) in codes"
          :key="index"
          class="code-item"
          :class="{ active: codeIndex == index }"
          v-html="code"
        ></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.section {
  position: fixed;
  right: 0;
  bottom: 100px;
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.container {
  display: flex;
  flex-direction: row-reverse;
  overflow: hidden;
}

.container.active {
  overflow: visible;
}

.info-container {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 600;
}

.action-container {
  align-self: flex-end;
  margin-right: 50px;
  font-weight: 600;
  font-size: 20px;
}

.status-container {
  margin: 10px 0;
}

.status-container .toggle,
.status-container .content > span {
  padding: 10px;
}

.status-container .toggle,
.status-container .content {
  background: #52bc69;
  text-wrap: wrap;
}

.trace-container {
  min-height: 200px;
}

.trace-container .toggle,
.trace-container .content {
  background: #2ebbd1;
}

.toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  cursor: pointer;
}

.toggle .icon {
  fill: #fff;
  transition: all 0.5s;
}

.container.active .icon {
  transform: rotateZ(180deg);
}

.content {
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  color: #fff;
  width: 0px;
  transition: all 0.5s;
  white-space: nowrap;
  overflow: hidden;
}

.container.active .content {
  width: 400px;
  white-space: pre;
}

.code-item {
  padding: 6px 10px;
}

.code-item.active {
  background: #000;
}
</style>
