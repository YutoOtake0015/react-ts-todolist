import React, { useState } from "react";
import AdditionalForm from "./components/AdditionalForm";
import EditForm from "./components/EditForm";
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

  const [editable, setEditable] = useState(false);
  const [editId, setEditId] = useState(0);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // handle
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

  return (
    <>
      {editable ? (
        <EditForm
          todos={todos}
          setTodos={setTodos}
          setEditable={setEditable}
          editId={editId}
          setEditId={setEditId}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editContent={editContent}
          setEditContent={setEditContent}
        />
      ) : (
        <AdditionalForm todos={todos} setTodos={setTodos} />
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
