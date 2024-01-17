<script lang="ts" setup>
import { IPoint, ILine, UILine } from "@/types";
import { ref, computed } from "vue";

const props = withDefaults(
  defineProps<{
    line: UILine;
  }>(),
  {}
);

const dPath = computed(() => {
  const { start, end } = props.line;
  return `M ${start.position.x},${start.position.y} L ${end.position.x},${end.position.y}`;
});
</script>

<template>
  <path
    :id="'l' + line.key"
    :d="dPath"
    :stroke="line.isTraver ? '#ff8a27' : '#333'"
    :opacity="line.isShow ? 1 : 0"
    stroke-width="2"
  ></path>
</template>

<style scoped>
path {
  transition: all 0.5s;
}
</style>
