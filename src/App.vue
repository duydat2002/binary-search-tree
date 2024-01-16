<script lang="ts" setup>
import HelloWorld from "@/components/HelloWorld.vue";
import BSTView from "@/components/Molecules/BSTView.vue";
import Test from "@/components/Test.vue";
import TestUI from "./components/TestUI.vue";
import Test1 from "./components/Test1.vue";

import { ref, onMounted } from "vue";

const isMounted = ref(false);

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <div class="main">
    <Test1 v-if="isMounted" />
    <!-- <Test v-if="isMounted" /> -->
    <!-- <TestUI v-if="isMounted" /> -->
    <!-- <HelloWorld /> -->
    <BSTView />
  </div>
</template>

<style scoped>
.main {
  overflow: hidden;
  height: 100vh;
}
</style>
