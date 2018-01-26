# ReactでWAI-ARIAに対応したタブUIを実装する方法

**HTMLのマークアップでアクセシビリティーを向上させる方法として、WAI-ARIA（ウェイ・アリア）があります**。HTML要素の属性に `aria-*` を追加することで音声読み上げの精度を高められます。

WAI-ARIAの特徴として、状態を示す属性が存在します。例えば、`aria-selected` 属性。名前の通り、該当のHTML要素が選択状態であるかを示すことができます。ウェブサイトのUIパーツにはタブやアコーディオンなど動的なものがあります。こういった**動的なパーツの「状態」はHTMLのマークアップだけでは示すことが難しく、JavaScriptの実装が不可欠**です。

![180109_angular_dom.gif](https://qiita-image-store.s3.amazonaws.com/0/2544/e21b9985-4745-5e72-0e91-4c9dcf657cd8.gif)

▲本記事で解説するサンプル。タブの切り替えによって、`aria-selected`属性を動的に切り替えている。JavaScriptの制御が必要である。


よく利用される例としてタブ型のユーザーインターフェースを題材とし、流行りのJSライブラリでのそれぞれで実装方法を紹介します。この記事ではReactでの実装方法を紹介します。

Reactではなく他のJSライブラリの作り方を知りたい方にも、記事をすでに公開しています。Angularでの実装方法は記事「[AngularでWAI\-ARIA対応のタブ型UIを実装する方法](https://qiita.com/clockmaker/items/2ccf50429a5465ea5a69)」を参考ください。Vue.js版は後日公開予定です。


### WAI-ARIAのサンプルの読み上げ

まずは、WAI-ARIA対応有無によってどのような違いがあるのか確認しましょう。

macOS標準搭載のVoiceOverを使うことで、ウェブページを読み上げられます。特別なブラウザは必要なく、ChromeやSafariで読み上げを確認できます。解説のために、半透明の黒い吹き出しに読み上げ音声の文言を表示させています（実際には音声が流れています）。

**アクセシビリティーに対応してコーディングできていれば、しっかりと読み上げられています**。タブキーで操作可能であり、選択されているものが「tab」であることやタブの順番（例：1/3）、選択中のタブは「選択された項目」と状態が認識されています。

![180109_angular_voiceover.gif](https://qiita-image-store.s3.amazonaws.com/0/2544/c7425213-b909-a0e3-faaf-eabd7f2797c6.gif)

対して、**全くアクセシビリティーを意識せずに設計した場合はどうなるでしょう？** 次のサンプルは、`aria`属性や`role`属性を使わず、さらに`a`要素や`button`要素、`tabindex`属性など全く配慮しなかったものです。**ほとんど的外れな読み上げをしていて使い物になりません**。タブキーで操作不能でマウスでしか操作できません。

![180109_react_bad_sample.gif](https://qiita-image-store.s3.amazonaws.com/0/2544/2e86cac8-117c-637d-1e9c-89ddac8caa6a.gif)



### Reactで実装したWAI-ARIAのサンプル

WAI-ARIAに対応したReactのサンプルを紹介します。GitHubにアップしているので、デモとソースコードをご覧ください。


- [別ウインドウで再生する](https://ics-creative.github.io/180109_wai_aria/react/)
- [GitHubでコードを確認する](https://github.com/ics-creative/180109_wai_aria/tree/master/react-sample)



前提として、[create-react-app](https://github.com/facebook/create-react-app)を使って環境構築したものとします。

create-react-appを使っていなくても、記事「[最新版で学ぶwebpack 3入門 \- BabelでES2017環境の構築\(Reactのサンプル付き\)](https://ics.media/entry/16028)」で紹介しているようにwebpack等で環境構築されていても構いません。


### Reactでのステート管理

実装の要素として`state`に選択されたタブのIDを保持することとします。

```js
this.state = {
  tab: 'panel1',
};
```

※コードは抜粋で掲載しているので、コピーする際はGitHubの「[app.js](https://github.com/ics-creative/180109_wai_aria/blob/master/react-sample/src/App.js)」を参照ください。



### HTMLの実装

HTMLの実装を紹介します。このコードは`render()`関数にJSXで書いています。

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

※説明の簡略化のためにRedux等は利用せずに解説しています。またリストの項目は動的に実装できそうですが、あえて静的なJSXとしてコードを書いています。


HTMLコーディングのポイントとしては次の通り。

- 期待どおりに読み上げられるように`role`属性を適切に利用します
- タブとして機能するように、`ul`要素に`role="tablist"`、 タブ部分となる`button`要素に`role="tab"`、 パネル部分の`div`要素に`role="tabpanel"`を追加します
    - 慣習に従って`ul>li`でマークアップしましたが、読み上げの支障となるので`li`タグには`role="presentation"`を指定してます（もしかしたらタブUIに`ul>li`を使う必要はないかもしれません）
- タブ側のボタンは `a` 要素ではなく `button` 要素を使ってます。macOS Safariだと `a[href="任意"]` 要素はデフォルトでタブキーで操作できないためです。Safariでは次のように「Tabキーを押したときにWebページ上の各項目を強調表示」を選択すると、a要素もタブキーで選択可能になります。ただ、このオプションを設定していなくてもタブキーで選択されたほうが望ましいと考えてのことです

![image.png](https://qiita-image-store.s3.amazonaws.com/0/2544/3fb5b1fa-7e7c-94e9-759c-48159c876714.png)


JavaScriptとReactに絡んでくるポイントは次の通り。

- タブとなる`button`要素とパネルの`div`要素の関連性を示すため`aria-controls`属性を指定します。値は任意で`id`属性で指定します
- `button`要素にタブの選択状態を伝えるために、`aria-selected`を真偽値で指定します
  - Reactのステートの値で動的とします。こうすれば半自動的に`aria-selected`属性が切り替わります
- パネル部分が表示・非表示の状態を伝えるために `aria-hidden`属性を真偽値で指定します


### ボタン要素のイベントハンドラー

ボタン要素のイベントハンドラーのコードを紹介します。ボタンとパネルの紐付けは、意味的に合致している `aria-controls` 属性を利用してます。JavaScriptの制御が必要なものは独自の変数ではなく、可能な限り `aria-*` 属性で代替するのがベターなやり方と思います。


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

### CSSの実装

CSSはなるべく `class` 属性を使わず、`aria-*` 属性をセレクターとして指定しています。こうすれば、余計なクラス属性を増やす必要がなくなります。


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



※コードは抜粋で掲載しているので、コピーする際はGitHubの「[App\.css](https://github.com/ics-creative/180109_wai_aria/blob/master/react-sample/src/App.css)」を参照ください。


CSSの実装はCodeGridの記事「[WAI\-ARIAを活用したフロントエンド実装](https://app.codegrid.net/entry/wai-aria-1)」で紹介されている**「aria属性をCSSセレクタとして利用する」「独自に名前を付けるくらいなら、意味的に合致するaria属性を利用して、アクセシビリティーを確保しましょう」**の提案をアイデアとしています。



### まとめ

Reactで実装する場合はタブの状態はいずれかの`state`か`props`で管理しているはずです。その値を間借りして`aria-*`属性に適用すれば、簡単にアクセシビリティーを向上できます。これは一例に過ぎません。さまざまなユーザーインターフェースに利用できるので応用くださいませ。

昨年の記事「[脱jQueryのためにしたこと \- Qiita](https://qiita.com/clockmaker/items/50c3a9772e36a95ae500)」でも紹介したように、これらのJSライブラリとWAI-ARIAの相性は抜群です。Reactユーザーがほんの少しWAI-ARIAの理解が進めば、簡単に利用できるでしょう。私個人としても多くのプロダクトで積極的にWAI-ARIAを実装しています（パブリックな事例としては「[ICS MEDIA](https://ics.media/)」、「[Beautifl](http://beautifl.net/)」など）。この記事によって、音声読み上げを求めているエンドユーザーへの配慮が少しでも進めばと考えています。

この方法はVue.jsでも実装できるので、続編記事で紹介します（この記事とほとんど同じ内容になると思いますが）。ぜひご利用ください。

### 補足


記事を作成するにあたり複数のサンプルを用意して音声読み上げソフト（macOSの「[VoiceOver](https://www.apple.com/jp/accessibility/mac/vision/)」や「[NVDA日本語版](https://www.nvda.jp/)」）で比較検証しましたが、マークアップはこれがベストの方法とは限りません。

本記事の主題はWAI-ARIAのベストな使い方を説明することではありません。**WAI-ARIAの実装にReactが役立つと紹介することです**。そのため、装飾や属性をシンプルなものとしています。コンテンツとの相性もあるでしょうから、ウェブサイトの方針にあわせて改良してください。
