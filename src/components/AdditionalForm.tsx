import React, { useState } from "react";

interface todosCondition {
  id: number;
  status: string;
  title: string;
  content: string;
}
interface AdditionalFormProps {
  todos: todosCondition[];
  setTodos: React.Dispatch<React.SetStateAction<todosCondition[]>>;
}

const AdditionalForm: React.FC<AdditionalFormProps> = ({ todos, setTodos }) => {
  // state
  const [newId, setNewId] = useState(todos.length + 1);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  //   handle
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

  // 関数
  const clearAddFormItems = () => {
    setNewTitle("");
    setNewContent("");
  };

  return (
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
  );
};

export default AdditionalForm;
