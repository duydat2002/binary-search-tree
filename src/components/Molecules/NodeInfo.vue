<script lang="ts" setup>
import { useBSTStore } from "@/store";
import { storeToRefs } from "pinia";

const { node } = storeToRefs(useBSTStore());
</script>

<template>
  <div v-if="node" class="container">
    <table>
      <tr>
        <td>Value</td>
        <td>{{ node.value }}</td>
      </tr>
      <tr>
        <td>Left</td>
        <td>{{ node.left || "null" }}</td>
      </tr>
      <tr>
        <td>Right</td>
        <td>{{ node.right || "null" }}</td>
      </tr>
      <tr>
        <td>Parent</td>
        <td>{{ node.parent || "null" }}</td>
      </tr>
      <tr>
        <td>Rank</td>
        <td>{{ node.rank }}</td>
      </tr>
      <tr>
        <td>Level</td>
        <td>{{ node.level }}</td>
      </tr>
      <tr>
        <td>Left size</td>
        <td>{{ node.leftSize }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  right: 0;
  top: 20px;
  z-index: 10;
  margin-right: 50px;
  background: #ff8a27;
  padding: 5px;
  border-radius: 8px;
}

.container table td {
  padding: 0 5px;
  color: #fff;
}
</style>
