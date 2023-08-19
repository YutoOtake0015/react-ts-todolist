import React, { useState } from "react";

interface todosCondition {
  id: number;
  status: string;
  title: string;
  content: string;
}
interface EditFormProps {
  todos: todosCondition[];
  setTodos: React.Dispatch<React.SetStateAction<todosCondition[]>>;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  editId: number;
  setEditId: React.Dispatch<React.SetStateAction<number>>;
  editTitle: string;
  setEditTitle: React.Dispatch<React.SetStateAction<string>>;
  editContent: string;
  setEditContent: React.Dispatch<React.SetStateAction<string>>;
}

const EditForm: React.FC<EditFormProps> = ({
  todos,
  setTodos,
  setEditable,
  editId,
  setEditId,
  editTitle,
  setEditTitle,
  editContent,
  setEditContent,
}) => {
  // const
  const [editStatus, setEditStatus] = useState("");

  // handle
  const handleChangeEditStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditStatus(e.target.value);
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

  // 関数
  const clearEditFormItems = () => {
    setEditId(0);
    setEditStatus("");
    setEditTitle("");
    setEditContent("");
  };

  return (
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
  );
};

export default EditForm;
