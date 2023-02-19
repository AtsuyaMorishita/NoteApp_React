import React from "react";
import "./Main.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

function Main({ activeNote, onUpdateNote }) {
  console.log("アクティブ状態の記事", activeNote);
  /**
   * 記事を編集する ※フォーム入力の度に発火する
   * @param {フォームのキー} key
   * @param {入力された値} value
   */
  const onEditNote = (key, value) => {
    //新しい記事配列をセット
    onUpdateNote({
      ...activeNote, //以前のアクティブ状態の記事に対して追加をする
      [key]: value, //キーとバリュー
      modDate: Date.now(), //日付
    });
  };

  //選択状態がない場合
  if (!activeNote) {
    return <div className="no-active-note">ノートが選択されておりません。</div>;
  }

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          id="title"
          type="text"
          value={activeNote.title}
          onChange={(e) => onEditNote("title", e.target.value)}
        />
        <textarea
          id="contents"
          placeholder="ノート内容を記入"
          value={activeNote.content}
          onChange={(e) => onEditNote("content", e.target.value)}
        ></textarea>
      </div>

      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default Main;
