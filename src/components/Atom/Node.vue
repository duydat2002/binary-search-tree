<script lang="ts" setup>
import { ref, computed } from "vue";
import { NODE_RADIUS, NODE_PADDING, NODE_TEXTSIZE } from "@/constants";
import { INode } from "@/types";

const props = withDefaults(
  defineProps<{
    node: INode;
    isFocus?: boolean;
    isPoint?: boolean;
  }>(),
  {
    isFocus: false,
    isPoint: false,
  }
);

const textTopY = computed(() => {
  return props.node.position.y - NODE_RADIUS - NODE_PADDING;
});
const textBottomY = computed(() => {
  return props.node.position.y + NODE_RADIUS + NODE_PADDING + (NODE_TEXTSIZE + 5) * 0.75;
});
</script>

<template>
  <Teleport to="#node">
    <circle
      :class="'n' + node.value"
      :cx="node.position.x"
      :cy="node.position.y"
      :r="NODE_RADIUS"
      fill="#333"
      stroke="#333"
      stroke-width="1"
    />
  </Teleport>
  <Teleport to="#text">
    <text
      :class="'t' + node.value"
      :x="node.position.x"
      :y="textTopY"
      :font-size="NODE_TEXTSIZE"
      fill="red"
    >
      {{ !node.count ? node.value : `${node.value}-${node.count}` }}
    </text>
    <text
      v-if="isPoint"
      :class="'t' + node.value"
      :x="node.position.x"
      :y="textBottomY"
      :font-size="NODE_TEXTSIZE + 5"
      fill="red"
    >
      ^
    </text>
  </Teleport>
</template>

<style scoped>
text {
  font-weight: bold;
  text-anchor: middle;
  line-height: 1;
}
</style>
