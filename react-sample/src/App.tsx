import React, { useId } from "react";
import { FC, useState } from "react";
import "./App.css";

/**
 * タブUIのサンプルアプリケーションです。
 * @author IKEDA Yasunobu
 */
export const App: FC = () => {
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
  const [state, setState] = useState<string>("1");

  // クリックしたときのイベントハンドラーです。
  const handleClick = (event: React.MouseEvent) => {
    // イベント発生源の要素を取得
    const element = event.currentTarget;

    // aria-controls 属性の値を取得
    const tabState = element.getAttribute("aria-controls");

    if (!tabState) {
      return;
    }

    const tabId = tabState.split("-").pop();
    if (!tabId) {
      return;
    }

    // プロパティーを更新
    setState(tabId);
  };

  const id = useId();

  const toPanelId = (panelId: string) => id + "-panel-" + panelId;
  const toTabId = (tabId: string) => id + "-tab-" + tabId;

  return (
    <div>
      <ul role="tablist">
        {CONTENT_LIST.map((tab) => (
          <li key={tab.id} role="presentation">
            <button
              role="tab"
              id={toTabId(tab.id)}
              aria-controls={toPanelId(tab.id)}
              aria-selected={state === tab.id}
              onClick={handleClick}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      {CONTENT_LIST.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={toPanelId(tab.id)}
          aria-describedby={toTabId(tab.id)}
          hidden={state !== tab.id}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};
