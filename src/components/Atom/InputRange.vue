<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    propValue: number;
    min?: number;
    max?: number;
    step?: number;
  }>(),
  {
    propValue: 0,
    min: 0,
    max: 10,
    step: 1,
  }
);

const emit = defineEmits(["update:propValue"]);

const value = computed({
  get: () => props.propValue,
  set: (value) => {
    emit("update:propValue", value);
  },
});

const inputStyle = computed(() => {
  const breakpoint = ((value.value - props.min) * 100) / (props.max - props.min);
  return {
    backgroundImage: `linear-gradient(to right, #ff8a27 0%, #ff8a27 ${breakpoint}%, #d3d3d3 ${breakpoint}%, #d3d3d3 100%)`,
  };
});
</script>

<template>
  <div>
    <input type="range" :style="inputStyle" v-model="value" :min="min" :max="max" :step="step" />
  </div>
</template>

<style scoped>
div {
  width: 100%;
  display: flex;
  align-items: center;
}

input {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  background: #d3d3d3;
  border-radius: 6px;
  outline: none;
}

input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: #ff8a27;
  border-radius: 15px;
  cursor: pointer;
}
input::-moz-range-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: #ff8a27;
  border-radius: 15px;
  cursor: pointer;
}
</style>
