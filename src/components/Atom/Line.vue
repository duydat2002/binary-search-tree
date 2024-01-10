<script lang="ts" setup>
import { IPoint, ILine } from "@/types";
import { ref, computed } from "vue";

const props = withDefaults(
  defineProps<{
    line: ILine;
    isRun?: boolean;
    isFocus?: boolean;
  }>(),
  {
    isRun: false,
    isFocus: false,
  }
);

const dPath = computed(() => {
  const { start, end } = props.line;
  return `M ${start.position.x},${start.position.y} L ${end.position.x},${end.position.y}`;
});
</script>

<template>
  <Teleport to="#line">
    <path :id="'l' + line.start.value" :d="dPath" stroke="#333" stroke-width="2"></path>
  </Teleport>
</template>
