<script lang="ts" setup>
import { ref, computed } from "vue";
import { NODE_RADIUS, TEXT_PADDING, NODE_TEXTSIZE } from "@/constants";
import { UINode } from "@/types";
import { useBSTStore } from "@/store";

const props = defineProps<{
  node: UINode;
}>();

const { setNode } = useBSTStore();

const isHover = ref(false);

const fillNode = computed(() => {
  return isHover.value ? "#ff8a27" : props.node.isTraver ? "#ff8a27" : "#333";
});

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

const onMouseenter = () => {
  setNode(props.node);
  isHover.value = true;
};

const onMouseleave = () => {
  setNode(null);
  isHover.value = false;
};
</script>

<template>
  <circle
    :class="'n' + node.value"
    :cx="node.position.x"
    :cy="node.position.y"
    :r="NODE_RADIUS"
    :fill="fillNode"
    :stroke="fillNode"
    stroke-width="1"
    :opacity="node.isShow ? 1 : 0"
    cursor="pointer"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
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
