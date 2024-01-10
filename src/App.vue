<script lang="ts" setup>
import HelloWorld from "@/components/HelloWorld.vue";
import BSTView from "@/components/molecules/BSTView.vue";
import Test from "@/components/Test.vue";

import { ref, onMounted } from "vue";

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <div>cac</div>
  <Test v-if="isMounted" />
  <!-- <HelloWorld /> -->
  <div id="box">
    <svg width="1000" height="600" fill="currentColor">
      <g id="node"></g>
      <g id="line"></g>
      <g id="text"></g>
    </svg>
  </div>
</template>

<style scoped>
#e3.active {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 5s linear infinite;
}

#e3.active:hover {
  stroke-dashoffset: 0;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

#box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.test {
  width: 500px;
  height: 500px;
  background: #c2c2c2;
}
</style>
