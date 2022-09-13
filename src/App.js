import { useState, useEffect } from "react";
import "./App.css";
import { TaskCreator } from "./components/TaskCreator";
import { TaskTable } from "./components/TaskTable";
import { VisibilityControl } from "./components/VisibilityControl";
import {Container} from './components/Container'

function App() {
  const [tasksItems, setTasksItems] = useState([]);
  const [showCompleted, setShowCompleted] = useState([false]);

  function createNewTask(taskName) {
    // Validar si el taskName ya existe en el arreglo de task
    if (!tasksItems.find((task) => task.name === taskName)) {
      setTasksItems([...tasksItems, { name: taskName, done: false }]);
    }
  }

  const toggleTask = (task) => {
    setTasksItems(
      tasksItems.map((t) =>
        t.name === task.name ? { ...t, done: !t.done } : t
      )
    );
  };

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data) {
      setTasksItems(JSON.parse(data));
    }
  }, []);
  // Si no se coloca nada en el arreglo [] se ejecutara a penas la aplicacion cargue

  const cleanTasks = () => {
    // Buscar las tareas que NO estan hechas
    setTasksItems(tasksItems.filter((task) => !task.done));

    // Coloca el checkbox de limpiar en false luego del impiar
    setShowCompleted(false);
  };

  //Se ejecuta el useEffect cada que un codigo cambia
  useEffect(() => {
    // Recrea el arreglo nuevamente y lo almacena de nuvo
    localStorage.setItem("tasks", JSON.stringify(tasksItems));
  }, [tasksItems]);
  // si tasksItems cambia, vuelve a ejecutar todo lo que esta dentro del useEffect

  return (
    <main className="bg-dark vh-100 text-white">
      <Container>
        <TaskCreator createNewTask={createNewTask} />
        <TaskTable tasks={tasksItems} toggleTask={toggleTask} />
        <VisibilityControl
          isChecked={showCompleted}
          setShowCompleted={(checked) => setShowCompleted(checked)}
          cleanTasks={cleanTasks}
        />
        {showCompleted === true && (
          <TaskTable
            tasks={tasksItems}
            toggleTask={toggleTask}
            showCompleted={showCompleted}
          />
        )}
      </Container>
        
    </main>
  );
}

export default App;
