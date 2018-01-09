# ReactでWAI-ARIAに対応したタブUIを実装する方法

**HTMLのマークアップでアクセシビリティを向上させる方法として、WAI-ARIAがあります**。タグの属性に `aria-*` を追加することで音声読み上げの精度を高められます。

WAI-ARIAの特徴として、状態を示す属性が存在します。例えば、要素の選択状態を示すのに `aria-selected` を真偽値で指定します。ウェブサイトのUIパーツにはタブやアコーディオンなど動的なものがあります。こういった**動的なパーツの「状態」はHTMLのマークアップだけでは示すことが難しく、JavaScriptの実装が不可欠**です。

よく利用される例としてタブUIを題材とし、流行りのJSライブラリのAngular、Vue.js、Reactのそれぞれで実装方法を紹介します。初回はReactでの実装方法を紹介します。



## Reactで実装したWAI-ARIAのサンプル


- 別ウインドウで再生する
- GitHubでコードを確認する


## Reactサンプルの前提


前提として、create-react-app（React v16）で環境構築したものとします。create-react-appを使っていなくても、記事「」で紹介しているようにwebpack等で環境構築されていても構いません。


## Reactでのステート管理

実装の要素として`state`に選択されたタブのIDを保持することとします。

```js
this.state = {
    tab: 'panel1',
};
```

## HTMLの実装（ただしJSXです）

HTMLの実装を紹介します。もとは`render()`関数にJSXで書いています。
```jsx
<div>
  <ul role="tablist">
    <li role="presentation">
      <button role="tab"
              aria-controls="panel1"
              aria-selected={this.state.tab === 'panel1'}
              onClick={this._handleClick}>
        カベルネ・ソーヴィニョン
      </button>
    </li>
    <li role="presentation">
      <button role="tab"
              aria-controls="panel2"
              aria-selected={this.state.tab === 'panel2'}
              onClick={this._handleClick}>
        メルロー
      </button>
    </li>
    <li role="presentation">
      <button role="tab"
              aria-controls="panel3"
              aria-selected={this.state.tab === 'panel3'}
              onClick={this._handleClick}>
        ピノ・ノワール
      </button>
    </li>
  </ul>
  <div id="panel1"
        aria-hidden={this.state.tab !== 'panel1'}
        role="tabpanel">
    カベルネ・ソーヴィニョンはブドウの一品種。赤ワインの中でも渋くて重い味わいが特徴です。
  </div>
  <div id="panel2"
        aria-hidden={this.state.tab !== 'panel2'}
        role="tabpanel">
    メルローはブドウの一品種。味はカベルネ・ソーヴィニョンほど酸味やタンニンは強くなく、芳醇でまろやかで繊細な味わいです。
  </div>
  <div id="panel3"
        aria-hidden={this.state.tab !== 'panel3'}
        role="tabpanel">
    ピノ・ノワールはブドウの一品種。カベルネ・ソーヴィニョンと対照的で比較的軽口な味わいです。
  </div>
</div>
```

※説明の簡略化のためにRedux等は利用せずに解説しています。動的に実装できそうですが、あえて静的なJSXとしてコードを書いています。

ポイントとしては次の通り。

- タブパネルの役割を形成するために、`ul`要素に`tablist`、 タブ部分となる`button`要素に`tab`、 パネル部分の`div`要素に`tabpanel`を追加します
- タブとなる`button`要素とパネルの`div`要素の関連性を示すため`aria-controls`属性を指定します。値は任意で`id`属性で指定します
- `button`要素にタブの選択状態を伝えるために、`aria-selected`を真偽値で指定します
  - Reactのステートの値で動的とします。こうすれば半自動的に`aria-selected`属性が切り替わります
- パネル部分が表示・非表示の状態を伝えるために `aria-hidden`属性を真偽値で指定します
- 期待どおりに読み上げられるように`role`属性を適切に利用します。タブとして認識させるためには`role=tablist`や`role=tab`を指定する必要があります
    - 慣習に従って`ui>li`でマークアップしましたが、読み上げの支障となるので`li`タグには`role=presentation`を指定してます（もしかしたらタブUIに`ul>li`を使う必要はないかもしれない）


### ボタン要素のイベントハンドラー

ボタン要素のイベントハンドラーはこちら。ボタンとパネルの紐付けは、`aria-controls` 属性を利用してます。JavaScriptの制御が必要なものは独自の変数ではなく、可能な限り`aria-*`属性で代替するのがベターなやり方と思います。


```js
  /**
   * クリックしたときのイベントハンドラーです。
   * @param event イベントオブジェクトです。
   * @private
   */
  _handleClick(event) {
    // イベント発生源の要素を取得
    const element = event.currentTarget;

    // aria-controls 属性の値を取得
    const tabState = element.getAttribute('aria-controls');

    // プロパティーを更新
    this.setState({
      tab: tabState,
    });
  }
```

## CSSの実装

CSSはなるべく`class`属性を使わず、`aria-*`属性をセレクターとして指定しています。こうすれば、余計なクラス属性を増やす必要がなく、ARIA属性を実装する必然性が生まれます。

CSSの実装はCodeGridの記事「」で紹介されている「」をアイデアとしています。

一部抜粋。

```css
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
```


## まとめ

Reactで実装する場合はタブの状態はいずれかの`state`か`props`で管理しているはずです。その値を間借りして`aria-*`属性に適用すれば、簡単にアクセシビリティを向上できます。

記事「」でも紹介したように、これらのJSライブラリとWAI-ARIAの相性は抜群です。Reactユーザーがほんの少しWAI-ARIAの理解が進めば、簡単に利用できるでしょう。この記事によって、音声読み上げを求めているエンドユーザーへの配慮が少しでも進めばと考えています。

この方法はVue.jsやAngularでも実装できます。続編記事を用意したいと思います。ぜひご利用ください。

## 補足

サンプルを用意するにあたりバリエーションを用意し音声読み上げソフトで比較検証しましたが、マークアップ方法はこれがベストの方法とは限りません。

本記事の主題はWAI-ARIAのベストな使い方を説明することではありません。状態管理を扱うWAI-ARIAの実装にReactが役立つと紹介することです。そのため、装飾や属性をシンプルなものとして紹介しています。コンテンツとの相性もあるでしょうから、ウェブサイトの方針にあわせて改良してみてください。

Qiita上のコメント欄でご指南いただければ幸いです（エアリプなど非アクセシビリティな方法ではなく、追跡可能な形で指摘いただれば幸いです）。



##

WAI-ARIAの実装にはHTMLの正しいマークアップとJavaScriptの両方が必要です。が、実際にはウェブアクセシビリティへの意識の高い人が実装している印象があるものの、JavaScriptエンジニアの界隈からはあまり興味をもたれている気がしません。

逆にマークアップエンジニアの中にもJavaScriptを苦手としているのか、状態を示すWAI-ARIAが実装されているのをあまりみかけません。私の観測範囲が狭いだけかもしれませんが。