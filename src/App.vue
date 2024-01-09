<script lang="ts" setup>
import Node from "@/components/Atom/Node.vue";
import BST from "@/composables/BST";

import { ref, onMounted } from "vue";
import { INode } from "./types";

const n1 = ref({ x: 60, y: 120 });
const n2 = ref({ x: 250, y: 300 });

const fontSize = ref(10);
const padding = ref(3);
const radius = ref(5);

const node1: INode = { value: 5, position: { x: 60, y: 120 } };
const node2: INode = { value: 8, count: 2, position: { x: 200, y: 230 } };

onMounted(() => {
  const tree = new BST();

  [10, 5, 11, 4, 8, 7, 9, 5, 6].forEach((i) => {
    tree.insert(i);
  });

  let arr: any[] = [];

  tree.preorder(tree.getRoot(), (node) => {
    arr.push(node);
  });
  console.log(arr);

  // tree.remove(5);

  // arr = [];
  // tree.preorder(tree.getRoot(), (node) => {
  //   arr.push(node);
  // });
  // console.log(arr);

  console.log(tree.search(tree.getRoot(), 5));

  console.log("min", tree.findMin(tree.getRoot()));
  console.log("max", tree.findMax(tree.getRoot()));
  console.log("height", tree.getHeight(tree.getRoot()));
  console.log("nodeLevel", tree.getNodeLevel(tree.getRoot(), 10));
  console.log("nodeLevel", tree.getNodeLevel(tree.getRoot(), 5));
  console.log("nodeLevel", tree.getNodeLevel(tree.getRoot(), 8));
  console.log("nodeLevel", tree.getNodeLevel(tree.getRoot(), 6));
});
</script>

<template>
  <div>cac</div>
  <div id="box">
    <svg width="1000" height="600" fill="currentColor">
      <g id="node">
        <!-- <circle class="n1" cx="60" cy="120" fill="#333" r="5" stroke="#333" stroke-width="1" />
        <circle class="n2" cx="250" cy="300" fill="#333" r="5" stroke="#333" stroke-width="1" /> -->
      </g>
      <g id="line">
        <!-- <path class="n1n2" d="M180,40,60,120" stroke="#333" stroke-width="2"></path> -->
      </g>
      <g id="text"></g>
    </svg>
  </div>
  <Node :node="node1" />
  <Node :node="node2" isPoint />
</template>

<style scoped>
svg {
  background: #fff;
}
</style>
