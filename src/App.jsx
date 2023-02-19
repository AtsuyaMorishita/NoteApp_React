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

  //選択状態を管理
  const [activeNote, setActiveNote] = useState();

  useEffect(() => {
    //ローカルストレージにノートを保存する ローカルストレージが読める状態に変換
    localStorage.setItem("notes", JSON.stringify(notes));

    //一番目を選択状態に
    setActiveNote(notes[0].id);
  }, [notes]);

  //ノートを追加する関数
  const onAddNote = () => {
    console.log("新しくノートが追加されました。");

    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "新しいノートの内容",
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);

    console.log(notes);
  };

  //ノートを削除する関数
  const onDeleteNote = (id) => {
    //idが一致しない記事を格納する
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const onUpdateNote = (updatedNote) => {
    //修正された新しいノートの配列を返す
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });
    setNotes(updatedNotesArray);
  };

  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        notes={notes}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
