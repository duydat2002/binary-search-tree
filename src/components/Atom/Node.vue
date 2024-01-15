<script lang="ts" setup>
import { ref, computed } from "vue";
import { NODE_RADIUS, TEXT_PADDING, NODE_TEXTSIZE, NODE_PADDING, SVG_PADDING } from "@/constants";
import { INode, IPoint, UINode } from "@/types";

const props = withDefaults(
  defineProps<{
    node: UINode;
  }>(),
  {}
);

const position = computed(() => {
  return {
    x: NODE_PADDING * props.node.rank + SVG_PADDING,
    y: NODE_PADDING * props.node.level + SVG_PADDING,
  } as IPoint;
});

const textTopY = computed(() => {
  return position.value.y - NODE_RADIUS - TEXT_PADDING;
});
const textBottomY = computed(() => {
  return position.value.y + NODE_RADIUS + TEXT_PADDING + (NODE_TEXTSIZE + 5) * 0.75;
});
</script>

<template>
  <Teleport to="#node">
    <circle
      :class="'n' + node.value"
      :cx="position.x"
      :cy="position.y"
      :r="NODE_RADIUS"
      fill="#333"
      stroke="#333"
      stroke-width="1"
      :opacity="node.isShow ? 1 : 0"
    />
  </Teleport>
  <Teleport to="#text">
    <text
      :class="'t' + node.value"
      :x="position.x"
      :y="textTopY"
      :font-size="NODE_TEXTSIZE"
      fill="red"
      :opacity="node.isShow ? 1 : 0"
    >
      {{ node.quantity == 1 ? node.value : `${node.value}-${node.quantity}` }}
    </text>
    <text
      v-if="node.extraText"
      :class="'t' + node.value"
      :x="position.x"
      :y="textBottomY"
      :font-size="NODE_TEXTSIZE + 5"
      fill="red"
      :opacity="node.isShow ? 1 : 0"
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
