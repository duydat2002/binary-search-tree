<script lang="ts" setup>
import XIcon from "@icons/x.svg";

import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useBSTStore, useControllerStore } from "@/store";
import { IPosition } from "@/types";

const { isShowGuide } = storeToRefs(useControllerStore());
const { codeTrace } = storeToRefs(useBSTStore());
const guideModal = ref<Nullable<HTMLDivElement>>(null);
const positions = ref<IPosition>({
  clientX: null,
  clientY: null,
  movementX: 0,
  movementY: 0,
});

const guides = computed(() => {
  return codeTrace.value.guides;
});

const closeModal = () => {
  isShowGuide.value = false;
};

const mouseDownModal = (e: MouseEvent) => {
  e.preventDefault();

  positions.value.clientX = e.clientX;
  positions.value.clientY = e.clientY;

  document.onmousemove = dragModal;
  document.onmouseup = closeDragModal;
};

const dragModal = (e: MouseEvent) => {
  e.preventDefault();

  positions.value.movementX = positions.value.clientX! - e.clientX;
  positions.value.movementY = positions.value.clientY! - e.clientY;
  positions.value.clientX = e.clientX;
  positions.value.clientY = e.clientY;

  guideModal.value!.style.top = guideModal.value!.offsetTop - positions.value.movementY + "px";
  guideModal.value!.style.left = guideModal.value!.offsetLeft - positions.value.movementX + "px";
};

const closeDragModal = () => {
  document.onmousemove = null;
  document.onmouseup = null;
};
</script>

<template>
  <div ref="guideModal" class="modal guide-modal" :class="{ active: isShowGuide }">
    <div class="header" @mousedown="mouseDownModal">
      <div class="title">Guide</div>
      <div class="close" @click="closeModal"><XIcon class="icon" /></div>
    </div>
    <div class="content">
      <span v-for="guide in guides" class="guide-item" v-html="guide"></span>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  padding: 10px;
  background: #fff;
  color: #000;
  border-radius: 10px;
  border: 1px solid #f7f7f7;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateX(-50%);
  overflow: hidden;
  z-index: 100;
  display: none;
}

.modal.active {
  display: block;
}

.header {
  padding-bottom: 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-bottom: 1px solid #dedede;
}

.title {
  font-size: 16px;
  font-weight: 600;
}

.close {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  cursor: pointer;
}

.icon {
  width: 14px;
  fill: #fa4545;
}

.content {
  display: flex;
  flex-direction: column;
  white-space: pre;
}

.guide-item {
  padding: 5px 0;
}

.text {
  color: #000;
  font-size: 14px;
  line-height: 1.6;
}
</style>
