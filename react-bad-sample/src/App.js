import React, {Component} from 'react';
import './App.css';

/**
 * タブUIのサンプルアプリケーションです。
 * @author Yasunobu Ikeda
 */
export default class App extends Component {

  constructor(props) {
    super(props);

    // ステートを定義
    this.state = {
      tab: 'panel1',
    };

    // イベントのスコープを登録（Reactの文化…）
    this._handleClick = this._handleClick.bind(this);
  }

  /**
   * クリックしたときのイベントハンドラーです。
   * @param event イベントオブジェクトです。
   * @private
   */
  _handleClick(event) {
    // イベント発生源の要素を取得
    const element = event.currentTarget;

    // aria-controls 属性の値を取得
    const tabState = element.dataset['controls'];

    // プロパティーを更新
    this.setState({
      tab: tabState,
    });
  }

  render() {
    return (
      <div>
        <ul>
          <li data-controls="panel1"
              className={this.state.tab === 'panel1' ? 'active' : ''}
              onClick={this._handleClick}>
            カベルネ・ソーヴィニョン
          </li>
          <li data-controls="panel2"
              className={this.state.tab === 'panel2' ? 'active' : ''}
              onClick={this._handleClick}>
            メルロー
          </li>
          <li data-controls="panel3"
              className={this.state.tab === 'panel3' ? 'active' : ''}
              onClick={this._handleClick}>
            ピノ・ノワール
          </li>
        </ul>
        <div id="panel1"
             className={this.state.tab === 'panel1' ? 'visible' : 'hidden'}>
          カベルネ・ソーヴィニョンはブドウの一品種。赤ワインの中でも渋くて重い味わいが特徴です。
        </div>
        <div id="panel2"
             className={this.state.tab === 'panel2' ? 'visible' : 'hidden'}>
          メルローはブドウの一品種。味はカベルネ・ソーヴィニョンほど酸味やタンニンは強くなく、芳醇でまろやかで繊細な味わいです。
        </div>
        <div id="panel3"
             className={this.state.tab === 'panel3' ? 'visible' : 'hidden'}>
          ピノ・ノワールはブドウの一品種。カベルネ・ソーヴィニョンと対照的で比較的軽口な味わいです。
        </div>
      </div>
    );
  }
}
