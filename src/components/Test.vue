<script lang="ts" setup>
import Node from "./Atom/Node.vue";
import Line from "./Atom/Line.vue";

import { ref, onMounted, watch } from "vue";
import { useDrawBST } from "@/composables";
import BST from "@/composables/BST";
import { ILine, INode } from "@/types";

const { initUI } = useDrawBST();

const arr = ref<number[]>([]);
const nodes = ref<INode[]>([]);
const lines = ref<ILine[]>([]);

const randomArr = () => {
  arr.value = Array.from({ length: Math.floor(Math.random() * 30 + 10) }, () =>
    Math.floor(Math.random() * 40 + 1)
  );

  const tree = new BST();
  arr.value.forEach((a) => tree.insert(a));

  console.log(tree.getNodes(tree.getRoot()));

  console.log(initUI(tree.getRoot()));

  const UI = initUI(tree.getRoot());

  nodes.value = UI.nodes;
  lines.value = UI.lines;
};

watch(arr, () => {});

onMounted(() => {
  // let arr = [10, 5, 11, 4, 8, 7, 9, 5, 6, 4];

  randomArr();
});
</script>

<template>
  <div>
    <button @click="randomArr">Random</button>
  </div>
  <Node v-if="nodes" v-for="node in nodes" :key="node.value" :node="node" />
  <Line v-if="lines" v-for="line in lines" :key="line.end.value" :line="line" />
</template>

<style scoped>
svg {
  background: #fff;
}
</style>
