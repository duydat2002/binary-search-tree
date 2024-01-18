<script lang="ts" setup>
import { ref, computed } from "vue";
import { NODE_RADIUS, TEXT_PADDING, NODE_TEXTSIZE, NODE_PADDING, SVG_PADDING } from "@/constants";
import { INode, IPoint, UINode } from "@/types";

const props = defineProps<{
  node: UINode;
}>();

const textY = computed(() => {
  return props.node.position.y - NODE_RADIUS - TEXT_PADDING;
});
const extraTextY = computed(() => {
  return props.node.position.y + NODE_RADIUS + TEXT_PADDING + (NODE_TEXTSIZE + 2) * 0.75;
});

const textStyle = computed(() => {
  return {
    fontSize: NODE_TEXTSIZE,
    fill: props.node.isTraver ? "#ff8a27" : "#333",
    opacity: props.node.isShow ? 1 : 0,
    transform: `translate(${props.node.position.x}px, ${textY.value}px)`,
  };
});
const extraTextStyle = computed(() => {
  return {
    fontSize: NODE_TEXTSIZE + 2,
    fill: "#ff1818",
    opacity: props.node.isShow ? 1 : 0,
    transform: `translate(${props.node.position.x}px, ${extraTextY.value}px)`,
  };
});
</script>

<template>
  <circle
    :class="'n' + node.value"
    :cx="node.position.x"
    :cy="node.position.y"
    :r="NODE_RADIUS"
    :fill="node.isTraver ? '#ff8a27' : '#333'"
    :stroke="node.isTraver ? '#ff8a27' : '#333'"
    stroke-width="1"
    :opacity="node.isShow ? 1 : 0"
  />
  <Teleport to="#text">
    <text :class="'t' + node.value" :style="textStyle">
      {{ node.quantity == 1 ? node.value : `${node.value}-${node.quantity}` }}
    </text>
    <text :class="'t' + node.value" :style="extraTextStyle"> {{ node.extraText || "" }} </text>
  </Teleport>
</template>

<style scoped>
circle,
text {
  transition: all 0.5s;
}

text {
  font-weight: bold;
  text-anchor: middle;
  line-height: 1;
}
</style>
