<script lang="ts" setup>
import Node from "./Atom/Node.vue";
import UINode from "./Atom/UINode.vue";
import Line from "./Atom/Line.vue";

import { ref, onMounted, watch } from "vue";
import { useDrawBST } from "@/composables";
import { useBST } from "@/composables";
import { UILine, UINode as Cac } from "@/types";

const { root, values, codeTrace, insert } = useBST();
const value = ref<number>();
const nodes = ref<Cac[]>([]);
const lines = ref<UILine[]>([]);
const traceIndex = ref<number>(0);
const traceStatus = ref<string>("");

const addNode = () => {
  if (value.value) {
    insert(value.value);

    // codeTrace.value.traces.forEach((trace) => {
    //   nodes.value = trace.nodes;
    //   lines.value = trace.lines;
    // });

    // console.log(root.value);
    // console.log(codeTrace.value);
  }
};

const showTrace = () => {
  const traceLength = codeTrace.value.traces.length;

  const index = traceIndex.value < traceLength ? traceIndex.value : traceLength - 1;

  const trace = codeTrace.value.traces[index < 0 ? 0 : index];

  nodes.value = trace.nodes;
  lines.value = trace.lines;
  traceStatus.value = trace.status;
};
</script>

<template>
  <div style="margin: 10px">
    <input type="number" v-model="value" />
    <button @click="addNode">Add</button>
  </div>
  <div style="margin: 10px">
    <input type="number" v-model="traceIndex" />
    <button @click="showTrace">Show trace</button>
    <span>{{ traceStatus }}</span>
  </div>
  <UINode v-if="nodes" v-for="node in nodes" :key="node.value" :node="node" />
  <Line v-if="lines" v-for="line in lines" :key="line.end.value" :line="line" />
</template>
