import React, {useCallback, useState} from 'react';
import './App.css';

/**
 * タブUIのサンプルアプリケーションです。
 * @author Yasunobu Ikeda
 */
const App = () => {

  // ステートを定義
  const [state, setState] = useState({
    tab: 'panel1',
  });


  // クリックしたときのイベントハンドラーです。
  const handleClick = useCallback((event) => {
    // イベント発生源の要素を取得
    const element = event.currentTarget;

    // aria-controls 属性の値を取得
    const tabState = element.dataset['controls'];

    // プロパティーを更新
    setState({
      tab: tabState,
    });
  }, []);

  return (
    <div>
      <ul>
        <li data-controls="panel1"
            className={state.tab === 'panel1' ? 'active' : ''}
            onClick={handleClick}>
          カベルネ・ソーヴィニョン
        </li>
        <li data-controls="panel2"
            className={state.tab === 'panel2' ? 'active' : ''}
            onClick={handleClick}>
          メルロー
        </li>
        <li data-controls="panel3"
            className={state.tab === 'panel3' ? 'active' : ''}
            onClick={handleClick}>
          ピノ・ノワール
        </li>
      </ul>
      <div id="panel1"
           className={state.tab === 'panel1' ? 'visible' : 'hidden'}>
        カベルネ・ソーヴィニョンはブドウの一品種。赤ワインの中でも渋くて重い味わいが特徴です。
      </div>
      <div id="panel2"
           className={state.tab === 'panel2' ? 'visible' : 'hidden'}>
        メルローはブドウの一品種。味はカベルネ・ソーヴィニョンほど酸味やタンニンは強くなく、芳醇でまろやかで繊細な味わいです。
      </div>
      <div id="panel3"
           className={state.tab === 'panel3' ? 'visible' : 'hidden'}>
        ピノ・ノワールはブドウの一品種。カベルネ・ソーヴィニョンと対照的で比較的軽口な味わいです。
      </div>
    </div>
  );
};
export default App;
