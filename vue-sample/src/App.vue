<script setup lang="ts">
import { ref } from "vue";

// タブデータの定義
const CONTENT_LIST = [
  {
    id: "1",
    label: "カベルネ・ソーヴィニョン",
    content:
        "カベルネ・ソーヴィニョンはブドウの一品種。赤ワインの中でも渋くて重い味わいが特徴です。",
  },
  {
    id: "2",
    label: "メルロー",
    content:
        "メルローはブドウの一品種。味はカベルネ・ソーヴィニョンほど酸味やタンニンは強くなく、芳醇でまろやかで繊細な味わいです。",
  },
  {
    id: "3",
    label: "ピノ・ノワール",
    content:
        "ピノ・ノワールはブドウの一品種。カベルネ・ソーヴィニョンと対照的で比較的軽口な味わいです。",
  },
];

// ステートを定義
const activeTabId = ref("1");

// クリックしたときのイベントハンドラーです。
const handleClick = (event: MouseEvent) => {
  const element = event.currentTarget as HTMLElement;
  const controlsId = element.getAttribute("aria-controls");

  if (!controlsId) {
    return;
  }

  const tabId = controlsId.replace("panel-", "");
  if (!tabId) {
    return;
  }
  activeTabId.value = tabId;
};
</script>

<template>
  <div>
    <ul role="tablist">
      <li v-for="tab in CONTENT_LIST" :key="tab.id" role="presentation">
        <button
            role="tab"
            :id="`tab-${tab.id}`"
            :aria-controls="`panel-${tab.id}`"
            :aria-selected="activeTabId === tab.id"
            @click="handleClick"
        >
          {{ tab.label }}
        </button>
      </li>
    </ul>
    <div v-for="tab in CONTENT_LIST" :key="tab.id">
      <div
          role="tabpanel"
          :id="`panel-${tab.id}`"
          :aria-labelledby="`tab-${tab.id}`"
          :hidden="activeTabId !== tab.id"
          class="panel"
      >
        {{ tab.content }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 装飾 */
[role="tablist"] {
  display: flex;
  margin-bottom: 0;
}

ul {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
  margin: 0;
}

button {
  appearance: none;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-bottom: none;
  background: #f8f8f8;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 4px 4px 0 0;
}

button:not([aria-selected="true"]):hover {
  background: #e8e8e8;
}

[role="tabpanel"] {
  border: 1px solid #ccc;
  padding: 2rem;
  background: #fff;
}

/* UI制御のための指定 */
[aria-selected="true"] {
  background-color: royalblue;
  color: white;
}

.panel {
  padding: 2rem;
  max-width: 480px;
  line-height: 175%;
  background: #fff;
}
</style>
