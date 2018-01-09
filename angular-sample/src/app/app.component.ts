import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tab = 'panel1';

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
    this.tab = tabState;
  }
}
