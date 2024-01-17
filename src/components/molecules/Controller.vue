<script lang="ts" setup>
import RightIcon from "@icons/right.svg";

import { ref, computed, nextTick } from "vue";
import { ICodeTrace, ITrace, TExtend } from "@/types";
import { useBSTUI } from "@/composables/useBSTUI";
import { storeToRefs } from "pinia";
import { useBSTStore, useControllerStore } from "@/store";
import { randomNumber, randomArrNumber } from "@/utils";

const {
  BST,
  resetBST,
  bstToUI,
  getRootHeight,
  getMaxRank,
  getBST,
  getBSTRoot,
  search,
  insert,
  findNodeLevel,
  findNodeRank,
} = useBSTUI();
const { codeTrace, codeStep, action } = storeToRefs(useBSTStore());
const { isPlay } = storeToRefs(useControllerStore());

const isShow = ref(true);
const activeExtend = ref<Nullable<TExtend>>(null);
const inserError = ref(false);
const listNode = ref(randomArrNumber(5, 10, 50).join(", "));
const randomN = ref(randomNumber(10, 30));

const emptyBST = () => {
  resetBST();

  codeStep.value = 0;
  codeTrace.value = { codes: [], traces: [] };
};

const handleEmpty = () => {
  emptyBST();
  action.value = "";
  activeExtend.value = null;
};

const handleRandom = () => {
  emptyBST();
  action.value = "";

  const arr = randomArrNumber(randomN.value, 1, 100);
  arr.forEach((a) => {
    insert(a);
  });

  codeTrace.value = bstToUI();
};

const handleInsert = () => {
  // Check
  const arr = listNode.value.split(",");
  const hasNaN = arr.some((a) => a != "" && isNaN(Number(a)));

  if (hasNaN) {
    inserError.value = true;
  } else {
    inserError.value = false;

    codeStep.value = 0;

    let codes: string[] = [];
    const traces: ITrace[] = [];

    arr.forEach((n) => {
      if (n != "") {
        const codeTrace = insert(Number(n));
        codes = codeTrace.codes;
        traces.push(...codeTrace.traces);
      }
    });

    action.value = `Insert(${arr.filter((a) => a != "").join(",")})`;

    codeTrace.value = {
      codes,
      traces,
    };

    isPlay.value = true;
    isShow.value = false;
  }
};

const handleSearch = () => {
  codeStep.value = 0;

  action.value = `Search(${randomN.value})`;

  codeTrace.value = search(randomN.value);

  isPlay.value = true;
  isShow.value = false;
};

const toggle = () => {
  if (isShow.value) activeExtend.value = null;
  isShow.value = !isShow.value;
};

const toggleExtend = (extend: Nullable<TExtend>) => {
  if (extend != activeExtend.value) {
    activeExtend.value = extend;

    switch (extend) {
      case "Create":
        randomN.value = randomNumber(10, 30);
        break;
      case "Search":
      case "Predec-/Succ-essor":
      case "FindNode'sRank":
      case "FindNote'sLevel":
        randomN.value = randomNumber(10, 100);
        break;
      case "Insert":
      case "Remove":
        listNode.value = randomArrNumber(randomNumber(1, 5), 10, 50).join(", ");
        break;
      case "FindNodeAtRank":
        randomN.value = randomNumber(1, 15);
        break;
    }
  }
};
</script>

<template>
  <div class="container controller" :class="{ active: isShow }">
    <div class="toggle" @click="toggle">
      <RightIcon class="icon" />
    </div>
    <div class="content">
      <div class="item" @click="handleEmpty">
        <span>Empty</span>
      </div>
      <div class="item" @click="toggleExtend('Create')">
        <span>Create</span>
        <div v-if="activeExtend == 'Create'" class="extend">
          <div class="input">
            <span>N = </span>
            <input class="small" type="number" min="1" v-model="randomN" />
          </div>
          <div class="button" @click="handleRandom">
            <span>Random</span>
          </div>
        </div>
      </div>
      <div class="item" @click.prevent="toggleExtend('Search')">
        <span>Search(n)</span>
        <div v-if="activeExtend == 'Search'" class="extend">
          <div class="input">
            <span>n = </span>
            <input class="small" type="number" v-model="randomN" />
          </div>
          <div class="button" @click="handleSearch">
            <span>Search</span>
          </div>
        </div>
      </div>
      <div class="item" @click="toggleExtend('Insert')">
        <span>Insert(n)</span>
        <div v-if="activeExtend == 'Insert'" class="extend">
          <div class="input">
            <span>n = </span>
            <input v-model="listNode" />
          </div>
          <div class="button" @click="handleInsert">
            <span>Insert</span>
          </div>
          <span v-if="inserError" class="error"
            >Please fill in a number or comma-separated array of numbers!</span
          >
        </div>
      </div>
      <div class="item">
        <span>Remove(n)</span>
        <div class="extend"></div>
      </div>
      <div class="item">
        <span>Traverse(root)</span>
        <div class="extend"></div>
      </div>
      <div class="item">
        <span>Predec-/Succ-essor(n)</span>
        <div class="extend"></div>
      </div>
      <div class="item">
        <span>Find node at rank(r)</span>
        <div class="extend"></div>
      </div>
      <div class="item">
        <span>Find node's rank(n)</span>
        <div class="extend"></div>
      </div>
      <div class="item">
        <span>Find node's level(n)</span>
        <div class="extend"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: fixed;
  left: 0;
  bottom: 100px;
  display: flex;
  z-index: 10;
  overflow: hidden;
}

.container.active {
  overflow: visible;
}

.toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  background: #fa7f7f;
  cursor: pointer;
}

.toggle .icon {
  fill: #fff;
  transition: all 0.5s;
}

.controller.active .icon {
  transform: rotateZ(180deg);
}

.content {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  background: #fa7f7f;
  color: #fff;
  width: 0px;
  transition: all 0.5s;
  white-space: nowrap;
}

.controller.active .content {
  width: 165px;
}

.item {
  position: relative;
  user-select: none;
}

.item > span {
  display: block;
  padding: 6px 10px;
  width: 100%;
  cursor: pointer;
}

.item > span:hover {
  background: #000;
}

.item .extend {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-left: 10px;
  color: #000;
  user-select: none;
}

.extend .input {
  display: flex;
  align-items: center;
}

.extend input {
  padding: 5px 8px;
  background: #000;
  color: #fff;
  box-sizing: content-box;
  margin-left: 5px;
}

.extend input.small {
  width: 50px;
}

.extend .button {
  padding: 5px 8px;
  background: #fa7f7f;
  color: #fff;
  cursor: pointer;
}

.extend .button:hover {
  background: #000;
}

.error {
  font-size: 12px;
  color: #f34444;
}
</style>
