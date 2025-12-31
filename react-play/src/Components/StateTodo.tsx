import { useState } from "react";
import cn from "classnames";

interface Todo {
  id: number;
  title: string;
  created: Date;
  isDone: boolean;
}

export default function StateTodo() {
  const [maxId, setMaxId] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [todo, setTodo] = useState<Todo[]>([]);
  const [desc, setDesc] = useState<boolean>(true);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleClick = () => {
    setTodo([
      ...todo,
      {
        id: maxId,
        title,
        created: new Date(),
        isDone: false,
      },
    ]);
    setMaxId((id) => id + 1);
  };

  const handleDone = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    console.log("target:", target);
    console.log("dataset:", target.dataset);
    console.log("dataset.id:", target.dataset.id);
    const targetId = Number(target.dataset.id);
    console.log("targetId:", targetId);

    setTodo((prevTodo) => {
      console.log("prevTodo:", prevTodo);
      const newTodo = prevTodo.map((item: Todo) => {
        console.log(
          "comparing:",
          item.id,
          "===",
          targetId,
          "→",
          item.id === targetId
        );
        if (item.id === targetId) {
          return {
            ...item,
            isDone: true,
          };
        } else {
          return item;
        }
      });
      console.log("newTodo:", newTodo);
      return newTodo;
    });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setTodo(todo.filter((item) => item.id !== Number(target.dataset.id)));
  };

  const handleSort = () => {
    const sorted = [...todo];
    sorted.sort((m, n) => {
      if (desc) {
        return n.created.getTime() - m.created.getTime();
      } else {
        return m.created.getTime() - n.created.getTime();
      }
    });

    setDesc((d) => !d);
    setTodo(sorted);
  };

  return (
    <div>
      <label>
        やることリスト
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChangeTitle}
        />
      </label>
      <button type="button" onClick={handleClick}>
        追加
      </button>
      <hr />
      <button onClick={handleSort}>ソート({desc ? "↑" : "↓"})</button>
      <ul>
        {todo.map((item) => (
          <li key={item.id}>
            <span className={cn({ "line-through text-gray-400": item.isDone })}>
              {item.title}
            </span>

            <button type="button" onClick={handleDone} data-id={item.id}>
              済
            </button>
            <button type="button" onClick={handleDelete} data-id={item.id}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
