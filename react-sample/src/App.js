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
    const tabState = element.getAttribute('aria-controls');

    // プロパティーを更新
    this.setState({
      tab: tabState,
    });
  }

  render() {
    return (
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
        <div role="tabpanel"
             id="panel1"
             aria-hidden={this.state.tab !== 'panel1'}>
          カベルネ・ソーヴィニョンはブドウの一品種。赤ワインの中でも渋くて重い味わいが特徴です。
        </div>
        <div role="tabpanel"
             id="panel2"
             aria-hidden={this.state.tab !== 'panel2'}>
          メルローはブドウの一品種。味はカベルネ・ソーヴィニョンほど酸味やタンニンは強くなく、芳醇でまろやかで繊細な味わいです。
        </div>
        <div role="tabpanel"
             id="panel3"
             aria-hidden={this.state.tab !== 'panel3'}>
          ピノ・ノワールはブドウの一品種。カベルネ・ソーヴィニョンと対照的で比較的軽口な味わいです。
        </div>
      </div>
    );
  }
}
