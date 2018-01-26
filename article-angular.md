# AngularでWAI-ARIA対応のタブ型UIを実装する方法

**HTMLのマークアップでアクセシビリティを向上させる方法として、WAI-ARIA（ウェイ・アリア）があります**。HTML要素の属性に `aria-*` を追加することで音声読み上げの精度を高められます。

WAI-ARIAの特徴として、状態を示す属性が存在します。例えば、`aria-selected` 属性。名前の通り、該当のHTML要素が選択状態であるかを示すことができます。ウェブサイトのUIパーツにはタブやアコーディオンなど動的なものがあります。こういった**動的なパーツの「状態」はHTMLのマークアップだけでは示すことが難しく、JavaScriptの実装が不可欠**です。

![180109_angular_dom.gif](https://qiita-image-store.s3.amazonaws.com/0/2544/e21b9985-4745-5e72-0e91-4c9dcf657cd8.gif)

▲本記事で解説するサンプル。タブの切り替えによって、`aria-selected`属性を動的に切り替えている。JavaScriptの制御が必要である。

よく利用される例としてタブのユーザーインターフェースを題材とし、流行りのJSライブラリの[Angular 5](https://angular.io/)の実装方法を紹介します。


## WAI-ARIAのサンプルの読み上げ

まずは、WAI-ARIA対応有無によってどのような違いがあるのか確認しましょう。

macOS標準搭載のVoiceOverを使うことで、ウェブページを読み上げられます。特別なブラウザは必要なく、ChromeやSafariで読み上げを確認できます。解説のために半透明の黒い吹き出しのなかに読み上げられた音声の文言を表示させています（実際には音声が流れています）。

**アクセシビリティーに対応してコーディングできていれば、しっかりと読み上げられています**。タブキーで操作可能であり、選択されているものが「tab」であることやタブの順番（例：1/3）、選択中のタブは「選択された項目」と状態が認識されています。

![180109_angular_voiceover.gif](https://qiita-image-store.s3.amazonaws.com/0/2544/c7425213-b909-a0e3-faaf-eabd7f2797c6.gif)

対して、**全くアクセシビリティーを意識せずに設計した場合どうなるでしょう？** 次のサンプルは、`aria`属性や`role`属性を使わず、さらに`button`要素や`tabindex`属性など全く配慮しなかったものです。**ほとんど的外れな読み上げをしていて使い物になりません**。タブキーで操作不能でマウスでしか操作できません。

![180109_react_bad_sample.gif](https://qiita-image-store.s3.amazonaws.com/0/2544/2e86cac8-117c-637d-1e9c-89ddac8caa6a.gif)





## Angularで実装したWAI-ARIAのサンプル

では、WAI-ARIAに対応したAngularのサンプルを紹介します。GitHubにアップしているので、デモとソースコードをご覧ください。

- [別ウインドウで再生する](https://ics-creative.github.io/180109_wai_aria/angular/)
- [GitHubでコードを確認する](https://github.com/ics-creative/180109_wai_aria/tree/master/angular-sample)


前提として、[Angular CLI](https://cli.angular.io/)（[Angular](https://angular.io/) 5）で環境構築したものとします。Angular 2以上であれば、本記事の内容が使えると思います。なお、AngularJS 1.x系とは互換性がないので注意ください。


### Angularでのステート管理

選択されたタブのIDをプロパティー`tab`に保持することとします。

```app.component.ts
export class AppComponent {
  tab = 'panel1';

  // (一部省略)
}
```

※コードは抜粋で掲載しているので、コピーする際はGitHubの「[app.component.ts](https://github.com/ics-creative/180109_wai_aria/blob/master/angular-sample/src/app/app.component.ts)」を参照ください。



### HTMLの実装

HTMLの実装を紹介します。

```app.component.html
<div>
  <ul role="tablist">
    <li role="presentation">
      <button role="tab"
              aria-controls="panel1"
              [attr.aria-selected]="tab === 'panel1'"
              (click)="_handleClick($event)">
        カベルネ・ソーヴィニョン
      </button>
    </li>
    <li role="presentation">
      <button role="tab"
              aria-controls="panel2"
              [attr.aria-selected]="tab === 'panel2'"
              (click)="_handleClick($event)">
        メルロー
      </button>
    </li>
    <li role="presentation">
      <button role="tab"
              aria-controls="panel3"
              [attr.aria-selected]="tab === 'panel3'"
              (click)="_handleClick($event)">
        ピノ・ノワール
      </button>
    </li>
  </ul>
  <div role="tabpanel"
       id="panel1"
       [attr.aria-hidden]="tab !== 'panel1'">
    カベルネ・ソーヴィニョンはブドウの一品種。赤ワインの中でも渋くて重い味わいが特徴です。
  </div>
  <div role="tabpanel"
       id="panel2"
       [attr.aria-hidden]="tab !== 'panel2'">
    メルローはブドウの一品種。味はカベルネ・ソーヴィニョンほど酸味やタンニンは強くなく、芳醇でまろやかで繊細な味わいです。
  </div>
  <div role="tabpanel"
       id="panel3"
       [attr.aria-hidden]="tab !== 'panel3'">
    ピノ・ノワールはブドウの一品種。カベルネ・ソーヴィニョンと対照的で比較的軽口な味わいです。
  </div>
</div>

```


※コードは抜粋で掲載しているので、コピーする際はGitHubの「[app.component.html](https://github.com/ics-creative/180109_wai_aria/blob/master/angular-sample/src/app/app.component.html)」を参照ください。

HTMLコーディングのポイントとしては次の通り。

- 期待どおりに読み上げられるように`role`属性を適切に利用します
- タブとして機能するように、`ul`要素に`role="tablist"`、 タブ部分となる`button`要素に`role="tab"`、 パネル部分の`div`要素に`role="tabpanel"`を追加します
    - 慣習に従って`ui>li`でマークアップしましたが、読み上げの支障となるので`li`タグには`role="presentation"`を指定してます（もしかしたらタブUIに`ul>li`を使う必要はないかもしれません）

JavaScriptとAngularに絡んでくるポイントは次の通り。

- タブとなる`button`要素とパネルの`div`要素の関連性を示すため`aria-controls`属性を指定します。値は任意で`id`属性で指定します
- `button`要素にタブの選択状態を伝えるために、`aria-selected`を真偽値で指定します
  - Angularのプロパティーの値で動的とします。こうすれば半自動的に`aria-selected`属性が切り替わります
- パネル部分が表示・非表示の状態を伝えるために `aria-hidden`属性を真偽値で指定します



### JSの実装

ボタン要素のイベントハンドラーのコードを紹介します。ボタンとパネルの紐付けは、意味的に合致している `aria-controls` 属性を利用してます。JavaScriptの制御が必要なものは独自の変数ではなく、可能な限り `aria-*` 属性で代替するのがベターなやり方と思います。



```app.component.ts
export class AppComponent {
  tab = 'panel1';

  /**
   * クリックしたときのイベントハンドラーです。
   * @param event イベントオブジェクトです。
   */
   _handleClick(event: MouseEvent): void {
    // イベント発生源の要素を取得
    const element = event.currentTarget as HTMLElement;

    // aria-controls 属性の値を取得
    const tabState = element.getAttribute('aria-controls');

    // プロパティーを更新
    this.tab = tabState;
  }
}

```

※コードは抜粋で掲載しているので、コピーする際はGitHubの「[app.component.ts](https://github.com/ics-creative/180109_wai_aria/blob/master/angular-sample/src/app/app.component.ts)」を参照ください。

### CSSの実装

CSSはなるべく `class` 属性を使わず、`aria-*` 属性をセレクターとして指定しています。こうすれば、余計なクラス属性を増やす必要がなくなります。

```app.component.css
/* タブパネルのUI制御のための指定 */
[aria-hidden="true"] {
    display: none;
}

[aria-hidden="false"] {
    display: block;
}

/* タブボタンのUI制御のための指定 */
[aria-selected="true"] {
    /* 選択されたときの色 */
    background-color: royalblue;
    color: white;
}
```

※コードは抜粋で掲載しているので、コピーする際はGitHubの「[app.component.css](https://github.com/ics-creative/180109_wai_aria/blob/master/angular-sample/src/app/app.component.css)」を参照ください。


CSSの実装はCodeGridの記事「[WAI\-ARIAを活用したフロントエンド実装](https://app.codegrid.net/entry/wai-aria-1)」で紹介されている**「aria属性をCSSセレクタとして利用する」「独自に名前を付けるくらいなら、意味的に合致するaria属性を利用して、アクセシビリティを確保しましょう」**の提案をアイデアとしています。

## まとめ

Angularで実装する場合は**タブの状態はいずれかのプロパティーで管理しているはず**です。その値を間借りして `aria-*` 属性に適用すれば、簡単にアクセシビリティを向上できます。今回はタブ型UIで紹介しましたが、これは一例に過ぎません。さまざまなユーザーインターフェースに利用できるので応用くださいませ。

昨年の記事「[脱jQueryのためにしたこと \- Qiita](https://qiita.com/clockmaker/items/50c3a9772e36a95ae500)」でも紹介したように、**AngularやVue.js等のJSライブラリとWAI-ARIAの相性は抜群です**。ほんの少しWAI-ARIAの理解が進めば、Angularユーザーの皆さんは簡単に利用できるでしょう。私個人としても多くのプロダクトで積極的にWAI-ARIAを実装しています（「[ICS MEDIA](https://ics.media/)」、「[Beautifl](http://beautifl.net/)」）。この記事によって、音声読み上げを求めているエンドユーザーへの配慮が少しでも進めばと考えています。

この方法はVue.jsやReactでも実装できるので、続編記事で紹介します（この記事とほとんど同じ内容になると思いますが）。ぜひご利用ください。

## 補足

記事を作成するにあたり複数のサンプルを用意して音声読み上げソフト（macOSの「[VoiceOver](https://www.apple.com/jp/accessibility/mac/vision/)」や「[NVDA日本語版](https://www.nvda.jp/)」）で比較検証しましたが、マークアップはこれがベストの方法とは限りません。

本記事の主題はWAI-ARIAのベストな使い方を説明することではありません。**状態明示のWAI-ARIAの実装にAngularが役立つと紹介することです**。そのため、装飾や属性をシンプルなものとしています。コンテンツとの相性もあるでしょうから、ウェブサイトの方針にあわせて改良してください。

