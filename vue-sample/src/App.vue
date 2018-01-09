<template>
  <div role="application">
    <ul role="tablist">
      <li>
        <button aria-controls="panel1"
                role="tab"
                v-bind:aria-selected="tab === 'panel1'"
                v-on:click="_handleClick">
          Windows
        </button>
      </li>
      <li>
        <button aria-controls="panel2"
                role="tab"
                v-bind:aria-selected="tab === 'panel2'"
                v-on:click="_handleClick">
          Mac OS X
        </button>
      </li>
      <li>
        <button aria-controls="panel3"
                role="tab"
                v-bind:aria-selected="tab === 'panel3'"
                v-on:click="_handleClick">
          Linux
        </button>
      </li>
    </ul>
    <div id="panel1"
         aria-labelledby="tab1"
         v-bind:aria-hidden="tab !== 'panel1'"
         role="tabpanel">
      Windowsは、マイクロソフトのオペレーティング
      システムまたはオペレーティング環境で、1985年11月に初めてリリースされた。
    </div>
    <div id="panel2"
         aria-labelledby="tab2"
         v-bind:aria-hidden="tab !== 'panel2'"
         role="tabpanel">
      アップルのMacintoshコンピュータ用の現行オペレーティングシステム (OS)
      である。バージョン9まで続いたそれまでのMac OSの後継として、BSD UNIXベースで新たに作られた。
    </div>
    <div id="panel3"
         aria-labelledby="tab3"
         v-bind:aria-hidden="tab !== 'panel3'"
         role="tabpanel">
      Linuxとは、一般的にはUNIXライクなコンピュータ用オペレーティングシステム（OS）の一群を指し、厳密にはその中核となる部分であるカーネルのことである。
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tab: 'panel1',
      };
    },
    methods: {
      /**
       * クリックしたときのイベントハンドラーです。
       * @param event イベントオブジェクトです。
       * @private
       */
      _handleClick: function (event) {
        // イベント発生源の要素を取得
        const element = event.currentTarget;

        // aria-controls 属性の値を取得
        const tabState = element.getAttribute('aria-controls');

        // プロパティーを更新
        this.tab = tabState;
      },
    },
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
