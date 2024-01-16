<script lang="ts" setup>
import UINode from "./Atom/UINode.vue";
import UILine from "./Atom/UILine.vue";
import { ref, computed, onMounted } from "vue";
import { useBSTUI } from "@/composables/useBSTUI";
import { ICodeTrace } from "@/types";

import { useCommonStore } from "@/store";

const { setBstWidth } = useCommonStore();

const codeTrace = ref<ICodeTrace>({
  codes: [],
  traces: [],
});
const index = ref(0);

const status = computed(() => {
  const trace = codeTrace.value.traces[index.value];
  return trace ? trace.status : "";
});
const code = computed(() => {
  const codeIndex = codeTrace.value.traces[index.value]?.codeIndex;
  return codeIndex ? codeTrace.value.codes[codeIndex] : "";
});
const nodes = computed(() => {
  return codeTrace.value.traces[index.value]?.nodes;
});
const lines = computed(() => {
  return codeTrace.value.traces[index.value]?.lines;
});

onMounted(() => {
  const { BST, getMaxRank, getBST, getBSTRoot, insert, findNodeLevel, findNodeRank } = useBSTUI();

  // insert(10);
  // insert(5);
  // insert(5);
  // insert(8);
  // insert(7);
  // insert(4);

  let arr = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100));

  // const arr = [5, 10, 3, 0, 2, 4];
  // const arr = [
  //   28, 63, 45, 16, 6, 39, 82, 41, 85, 93, 41, 63, 34, 51, 26, 2, 16, 13, 21, 93, 78, 59, 46, 60, 9,
  //   75, 25, 32, 89, 35, 21, 12, 80, 2, 57, 99, 49, 12, 7, 11, 87, 35, 98, 55, 89, 50, 41, 74, 2, 8,
  // ];
  arr.forEach((a) => insert(a));

  codeTrace.value = insert(39);

  console.log("getMaxRank", getMaxRank());

  setBstWidth((getMaxRank() + 4) * 30);

  // const
  // setBstWidth()

  // codeTrace.value = insert(6);

  // console.log("BST", BST.value);
  // console.log("findNodeLevel 5", findNodeLevel(getBST(), getBSTRoot()?.value, 5));
  // console.log("findNodeRank 8", findNodeRank(getBST(), getBSTRoot()?.value, 8));
});
</script>

<template>
  <div>
    <input type="number" v-model="index" />
  </div>
  <div>
    <p>Status: {{ status }}</p>
    <p>Code: {{ code }}</p>
  </div>
  <UINode v-if="nodes" v-for="node in nodes" :key="node!.value" :node="node!" />
  <UILine v-if="lines" v-for="line in lines" :key="line!.key" :line="line!" />
</template>
