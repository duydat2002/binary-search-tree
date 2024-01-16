<script lang="ts" setup>
import UINode from "./Atom/UINode.vue";
import UILine from "./Atom/UILine.vue";
import { ref, computed, onMounted } from "vue";
import { useBSTUI } from "@/composables/useBSTUI";
import { ICodeTrace, ITrace } from "@/types";

import { useBSTStore, useCommonStore } from "@/store";
import { storeToRefs } from "pinia";
const { setBstWidth } = useCommonStore();

const { BST, resetBST, getMaxRank, getBST, getBSTRoot, insert, findNodeLevel, findNodeRank } =
  useBSTUI();

const { codeTrace, codeIndex } = storeToRefs(useBSTStore());

const values = ref("");

const status = computed(() => {
  const trace = codeTrace.value.traces[codeIndex.value];
  return trace ? trace.status : "";
});
const code = computed(() => {
  const index = codeTrace.value.traces[codeIndex.value]?.codeIndex;
  return index ? codeTrace.value.codes[index] : "";
});
const nodes = computed(() => {
  return codeTrace.value.traces[codeIndex.value]?.nodes;
});
const lines = computed(() => {
  return codeTrace.value.traces[codeIndex.value]?.lines;
});

const onInsert = () => {
  codeIndex.value = 0;

  let codes: string[] = [];
  const traces: ITrace[] = [];

  if (/^(?=.*\d)[\d\s,]*$/.test(values.value)) {
    const arr = values.value?.split(",").map((v) => parseInt(v));

    arr.forEach((a) => {
      const codeTrace = insert(a);
      codes = codeTrace.codes;
      traces.push(...codeTrace.traces);
    });

    codeTrace.value = {
      codes,
      traces,
    };
  }
};

const onRandom = () => {
  resetBST();

  codeIndex.value = 0;

  let codes: string[] = [];
  const traces: ITrace[] = [];

  const arr = Array.from({ length: 50 }, () => Math.floor(Math.random() * 100));

  arr.forEach((a) => {
    const codeTrace = insert(a);
    codes = codeTrace.codes;
    traces.push(...codeTrace.traces);
  });

  codeTrace.value = {
    codes,
    traces,
  };
};

onMounted(() => {
  // insert(10);
  // insert(5);
  // insert(5);
  // insert(8);
  // insert(7);
  // insert(4);
  // let arr = Array.from({ length: 30 }, () => Math.floor(Math.random() * 100));
  // // const arr = [5, 10, 3, 0, 2, 4];
  // // const arr = [
  // //   28, 63, 45, 16, 6, 39, 82, 41, 85, 93, 41, 63, 34, 51, 26, 2, 16, 13, 21, 93, 78, 59, 46, 60, 9,
  // //   75, 25, 32, 89, 35, 21, 12, 80, 2, 57, 99, 49, 12, 7, 11, 87, 35, 98, 55, 89, 50, 41, 74, 2, 8,
  // // ];
  // arr.forEach((a) => insert(a));
  // codeTrace.value = insert(39);
  // console.log("getMaxRank", getMaxRank());
  // setBstWidth((getMaxRank() + 4) * 30);
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
    <input v-model="values" />
    <button @click="onInsert">Insert</button>
    <button @click="onRandom">Ramdom</button>
  </div>
  <div>
    <input type="number" v-model="codeIndex" />
  </div>
  <div>
    <p>Status: {{ status }}</p>
    <p>Code: {{ code }}</p>
  </div>
  <UINode v-if="nodes" v-for="node in nodes" :key="node!.value" :node="node!" />
  <UILine v-if="lines" v-for="line in lines" :key="line!.key" :line="line!" />
</template>
