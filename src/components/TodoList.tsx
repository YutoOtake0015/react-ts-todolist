import React from "react";

interface todosCondition {
  id: number;
  status: string;
  title: string;
  content: string;
}
interface TodoListProps {
  todo: todosCondition;
  todos: todosCondition[];
  setTodos: React.Dispatch<React.SetStateAction<todosCondition[]>>;
  editable: boolean;
  setEditable: React.Dispatch<React.SetStateAction<boolean>>;
  setEditId: React.Dispatch<React.SetStateAction<number>>;
  setEditTitle: React.Dispatch<React.SetStateAction<string>>;
  setEditContent: React.Dispatch<React.SetStateAction<string>>;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  todo,
  editable,
  setEditable,
  setEditId,
  setEditTitle,
  setEditContent,
}) => {
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
    <div>
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
    </div>
  );
};

export default TodoList;
