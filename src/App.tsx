import React, { useState } from "react";
interface todosCondition {
  id: number;
  status: string;
  title: string;
  content: string;
}

function App() {
  // state
  const [todos, setTodos] = useState<todosCondition[]>([
    { id: 1, status: "notStarted", title: "初めのタスク", content: "筋トレ" },
    { id: 2, status: "inProgress", title: "次のタスク", content: "ランニング" },
    { id: 3, status: "done", title: "第３のタスク", content: "瞑想" },
  ]);
  const [todo, setTodo] = useState<todosCondition>({
    id: 0,
    status: "",
    title: "",
    content: "",
  });
  const [newId, setNewId] = useState(todos.length + 1);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const [editable, setEditable] = useState(false);
  const [editId, setEditId] = useState(0);
  const [editStatus, setEditStatus] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // 関数
  const clearAddFormItems = () => {
    setNewTitle("");
    setNewContent("");
  };
  const clearEditFormItems = () => {
    setEditId(0);
    setEditStatus("");
    setEditTitle("");
    setEditContent("");
  };

  // handle
  const handleAddTodo = () => {
    setTodos([
      ...todos,
      { id: newId, status: "notStarted", title: newTitle, content: newContent },
    ]);
    setNewId((prevId) => prevId + 1);
    clearAddFormItems();
  };
  const handleChangeNewTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };
  const handleChangeNewContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContent(e.target.value);
  };
  const handleChangeStatus = (
    targetTodo: todosCondition,
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const updateTodos = todos.map((todo) =>
      todo.id === targetTodo.id ? { ...todo, status: e.target.value } : todo,
    );
    setTodos(updateTodos);
  };
  const handleEditTodo = (targetTodo: todosCondition) => {
    setEditable(true);

    setEditId(targetTodo.id);
    setEditTitle(targetTodo.title);
    setEditContent(targetTodo.content);
  };
  const handleDeleteTodo = (targetTodo: todosCondition) => {
    const updateTodos = todos.filter((todo) => todo.id !== targetTodo.id);
    setTodos(updateTodos);
  };
  const handleCloseEditForm = () => {
    setEditable(false);
  };
  const handleChangeEditTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };
  const handleChangeEditContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditContent(e.target.value);
  };
  const handleChangeTodo = () => {
    const updateTodos = todos.map((todo) =>
      todo.id === editId
        ? {
            ...todo,
            status: editStatus,
            title: editTitle,
            content: editContent,
          }
        : todo,
    );
    setTodos(updateTodos);
    clearEditFormItems();
    setEditable(false);
  };
  const handleChangeEditStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditStatus(e.target.value);
  };

  return (
    <>
      {editable ? (
        // 編集フォーム
        <div>
          状態：
          <select value={editStatus} onChange={handleChangeEditStatus}>
            <option value="notStarted">未着手</option>
            <option value="inProgress">実行中</option>
            <option value="done">完了</option>
          </select>
          <br />
          <label htmlFor="title">タイトル：</label>
          <input
            type="text"
            name="title"
            value={editTitle}
            onChange={handleChangeEditTitle}
          />
          <br />
          <label htmlFor="content">内容：</label>
          <input
            type="text"
            name="content"
            value={editContent}
            onChange={handleChangeEditContent}
          />
          <br />
          <button onClick={handleChangeTodo}>保存</button>
          <button onClick={handleCloseEditForm}>キャンセル</button>
        </div>
      ) : (
        // 追加フォーム
        <div>
          <label htmlFor="title">タイトル：</label>
          <input
            type="text"
            name="title"
            value={newTitle}
            onChange={handleChangeNewTitle}
          />
          <br />
          <label htmlFor="content">内容：</label>
          <input
            type="text"
            name="content"
            value={newContent}
            onChange={handleChangeNewContent}
          />
          <br />
          <button onClick={handleAddTodo}>作成</button>
        </div>
      )}
      <div>
        {/* todoリスト */}
        {todos.map((todo) => (
          <ul key={todo.id} style={{ listStyle: "none" }}>
            <li>
              状態：
              <select
                value={todo.status}
                onChange={(e) => handleChangeStatus(todo, e)}
                disabled={editable}
              >
                <option value="notStarted">未着手</option>
                <option value="inProgress">実行中</option>
                <option value="done">完了</option>
              </select>{" "}
            </li>
            <li> タイトル：{todo.title} </li>
            <li>内容：{todo.content}</li>
            <button onClick={() => handleEditTodo(todo)}>編集</button>
            {!editable && (
              <button onClick={() => handleDeleteTodo(todo)}>削除</button>
            )}
            <hr />
          </ul>
        ))}
      </div>
    </>
  );
}

export default App;
