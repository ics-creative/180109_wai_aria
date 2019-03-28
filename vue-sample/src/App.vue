<template>
  <div role="application">
    <ul role="tablist">
      <li role="presentation">
        <button
          aria-controls="panel1"
          role="tab"
          v-bind:aria-selected="tab === 'panel1' ? 'true' : 'false'"
          v-on:click="_handleClick"
        >
          カベルネ・ソーヴィニョン
        </button>
      </li>
      <li role="presentation">
        <button
          aria-controls="panel2"
          role="tab"
          v-bind:aria-selected="tab === 'panel2' ? 'true' : 'false'"
          v-on:click="_handleClick"
        >
          メルロー
        </button>
      </li>
      <li role="presentation">
        <button
          aria-controls="panel3"
          role="tab"
          v-bind:aria-selected="tab === 'panel3' ? 'true' : 'false'"
          v-on:click="_handleClick"
        >
          ピノ・ノワール
        </button>
      </li>
    </ul>
    <div
      id="panel1"
      aria-labelledby="tab1"
      v-bind:aria-hidden="tab !== 'panel1'"
      role="tabpanel"
    >
      カベルネ・ソーヴィニョンはブドウの一品種。赤ワインの中でも渋くて重い味わいが特徴です。

    </div>
    <div
      id="panel2"
      aria-labelledby="tab2"
      v-bind:aria-hidden="tab !== 'panel2'"
      role="tabpanel"
    >
      メルローはブドウの一品種。味はカベルネ・ソーヴィニョンほど酸味やタンニンは強くなく、芳醇でまろやかで繊細な味わいです。

    </div>
    <div
      id="panel3"
      aria-labelledby="tab3"
      v-bind:aria-hidden="tab !== 'panel3'"
      role="tabpanel"
    >
      ピノ・ノワールはブドウの一品種。カベルネ・ソーヴィニョンと対照的で比較的軽口な味わいです。
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: "panel1"
    };
  },
  methods: {
    /**
     * クリックしたときのイベントハンドラーです。
     * @param event イベントオブジェクトです。
     * @private
     */
    _handleClick(event) {
      // イベント発生源の要素を取得
      const element = event.currentTarget;

      // aria-controls 属性の値を取得
      const tabState = element.getAttribute("aria-controls");

      // プロパティーを更新
      this.tab = tabState;
    }
  }
};
</script>

<style>
/* 装飾 */

[role="tablist"] {
  display: flex;
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
}

[role="tabpanel"] {
  border: 1px solid lightgray;
  padding: 2rem;
}

/* UI制御のための指定 */
[aria-hidden="true"] {
  display: none;
}

[aria-hidden="false"] {
  display: block;
}

[aria-selected="true"] {
  background-color: royalblue;
  color: white;
}
</style>
