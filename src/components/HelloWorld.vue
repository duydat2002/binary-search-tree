<script lang="ts" setup>
import Node from "@/components/Atom/Node.vue";
import BST from "@/composables/BST";

import { ref, onMounted } from "vue";
import { INode } from "@/types";
import { useDrawBST } from "@/composables";

const n1 = ref({ x: 60, y: 120 });
const n2 = ref({ x: 250, y: 300 });

const fontSize = ref(10);
const padding = ref(3);
const radius = ref(5);

// const node1: INode = { value: 5, position: { x: 60, y: 120 } };
// const node2: INode = { value: 8, quantity: 2, position: { x: 200, y: 230 } };

onMounted(() => {
  const tree = new BST();
  const { initNodes } = useDrawBST();

  [10, 5, 11, 4, 8, 7, 9, 5, 6, 4, 6].forEach((i) => {
    tree.insert(i);
  });

  console.log(tree.values);

  console.log(tree.getNodes(tree.getRoot()));

  console.log(initNodes(tree.getRoot()));
  // tree.remove(5);

  // arr = [];
  // tree.preorder(tree.getRoot(), (node) => {
  //   arr.push(node);
  // });
  // console.log(arr);

  console.log(tree.search(tree.getRoot(), 5));

  console.log("min", tree.findMin(tree.getRoot()));
  console.log("max", tree.findMax(tree.getRoot()));
  console.log("height", tree.findHeight(tree.getRoot()));
  console.log("nodeLevel: " + 10, tree.findNodeLevel(tree.getRoot(), 10));
  console.log("nodeLevel: " + 5, tree.findNodeLevel(tree.getRoot(), 5));
  console.log("nodeLevel: " + 6, tree.findNodeLevel(tree.getRoot(), 6));
  console.log("nodeOfRank: " + 1, tree.findNodeByRank(tree.getRoot(), 1));
  console.log("nodeOfRank: " + 5, tree.findNodeByRank(tree.getRoot(), 5));
  console.log("nodeOfRank: " + 8, tree.findNodeByRank(tree.getRoot(), 8));
  console.log("nodeRank: " + 4, tree.findNodeRank(tree.getRoot(), 4));
  console.log("nodeRank: " + 2, tree.findNodeRank(tree.getRoot(), 2));
  console.log("nodeRank: " + 5, tree.findNodeRank(tree.getRoot(), 5));
  console.log("nodeRank: " + 8, tree.findNodeRank(tree.getRoot(), 8));
});
</script>

<template>
  <div>cac</div>
  <!-- <div id="box">
    <svg width="1000" height="600" fill="currentColor">
      <g id="node">
      </g>
      <g id="line">
      </g>
      <g id="text"></g>
    </svg>
  </div> -->
</template>

<style scoped>
svg {
  background: #fff;
}
</style>
