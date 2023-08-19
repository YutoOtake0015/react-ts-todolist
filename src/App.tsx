import React, { useState } from "react";
import AdditionalForm from "./components/AdditionalForm";
import EditForm from "./components/EditForm";
import TodoList from "./components/TodoList";
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

  return (
    <>
      {editable ? (
        // 編集フォーム
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
        // 作成フォーム
        <AdditionalForm todos={todos} setTodos={setTodos} />
      )}
      <div>
        {/* todoリスト */}
        {todos.map((todo) => (
          <TodoList
            todo={todo}
            todos={todos}
            setTodos={setTodos}
            editable={editable}
            setEditable={setEditable}
            setEditId={setEditId}
            setEditTitle={setEditTitle}
            setEditContent={setEditContent}
          />
        ))}
      </div>
    </>
  );
}

export default App;
