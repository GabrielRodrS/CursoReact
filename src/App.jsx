import AddTask from "./Components/AddTask";
import Tasks from "./Components/Tasks";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import Title from "./Components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //Chamado apenas uma vez ao acessar a aplicação
  useEffect(() => {
    /*
    // async function fetchTasks() { Pode também ser escrito assim
    const fetchTasks = async () => {
      //Chamar a API
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );

      //Pegar os dados que ela retorna
      const data = await response.json(); // Converter para json

      //Armazenar/persistir esses dados no state
      setTasks(data);
    };

    // fetchTasks(); Se quiser, você pode chamar uma API para pegar
    //                as suas tarefas!!!
    */
  }, []);

  function onDelClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      // Preciso atualizar esta tarefa
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      //Não preciso atualizar
      return task;
    });
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit}></AddTask>
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDelClick={onDelClick}
        ></Tasks>
      </div>
    </div>
  );
}

export default App;
