<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useBSTUI } from "@/composables/useBSTUI";
import { ICodeTrace } from "@/types";
import UINode from "./Atom/UINode.vue";
import UILine from "./Atom/UILine.vue";

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
  const { BST, getBST, getBSTRoot, insert, findNodeLevel, findNodeRank } = useBSTUI();

  insert(10);
  insert(5);
  insert(5);
  insert(8);
  insert(7);
  insert(4);
  codeTrace.value = insert(6);

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
