import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import uuid from "react-uuid";

function App() {
  //ノートのデータを配列で管理
  const [notes, setNotes] = useState(
    //jsで読める状態に変換
    JSON.parse(localStorage.getItem("notes")) || []
  );

  //アクティブな記事を管理
  const [activeNoteId, setActiveNoteId] = useState();

  useEffect(() => {
    //ローカルストレージにノートを保存する ローカルストレージが読める状態に変換
    localStorage.setItem("notes", JSON.stringify(notes));

    //一番目を選択状態に
    setActiveNoteId(notes[0].id);
  }, [notes]);

  console.log("全ての記事", notes);
  console.log("アクティブ状態の記事ID", activeNoteId);

  /**
   * ノートを追加する
   */
  const onAddNote = () => {
    console.log("新しくノートが追加されました。");

    const newNote = {
      id: uuid(),
      title: "",
      content: "",
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
  };

  /**
   * ノートを削除する
   * @param {記事ID} id
   */
  const onDeleteNote = (id) => {
    //idが一致しない記事を格納する
    //※直接notes配列を操作するのではなく、新しい配列をセットしてから差し替える
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };

  /**
   * アクティブ状態(選択、メイン表示)の記事を返す
   * @returns アクティブ状態の記事
   */
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNoteId);
  };

  /**
   *
   * @param {記事等のデータオブジェクト} updatedNote
   */
  const onUpdateNote = (updatedNote) => {
    //修正された新しいノートの配列を返す
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        //選択しているノート
        console.log("選択している記事", updatedNote);
        return updatedNote;
      } else {
        //それ以外の選択していないノート
        return note;
      }
    });
    console.log("修正された新しい記事配列", updatedNotesArray);
    setNotes(updatedNotesArray);
  };

  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        notes={notes}
        activeNoteId={activeNoteId}
        setActiveNoteId={setActiveNoteId}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
