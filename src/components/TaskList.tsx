import { MouseEvent, useEffect, useState } from 'react';
import { Task } from './Task';
import { TaskInterface } from '../interfaces/TaskInterface';
import axios from 'axios';

interface apiTasks {
  tasks: TaskInterface[];
}

export function TaskList() {
  let [tasks, setTasks] = useState<TaskInterface[]>([]);

  useEffect(() => {
    axios.get<apiTasks>('api/tasks').then((response) => {
      console.log(response.data.tasks);
      setTasks(response.data.tasks);
    });
  }, []);

  function handleTaskChecked(event: MouseEvent) {
    let id = event.currentTarget.id;
    console.log(id);
    axios
      .patch(`api/tasks/${id}`, {
        isChecked: !tasks.find((task) => task.id === id).isChecked,
      })
      .catch((error) => {
        console.log(error);
      });

    setTasks((tasks) => {
      return tasks.map((task) => {
        return task.id === id
          ? {
              ...task,
              isChecked: !task.isChecked,
            }
          : task;
      });
    });
  }

  function handleTaskDelete(event: MouseEvent) {
    let id = event.currentTarget.id;
    console.log(id);
    axios.delete(`api/tasks/${id}`).catch((error) => {
      console.log(error);
    });
    setTasks((tasks) => {
      return tasks.filter((task) => task.id !== id);
    });
  }

  return (
    <div className="grid grid-cols-8 gap-4 my-8 mx-24 justify-center justify-items-center items-center">
      {tasks.map((task) => {
        return (
          <Task
            title={task.title}
            id={task.id}
            key={task.id}
            isChecked={task.isChecked}
            onTaskChecked={handleTaskChecked}
            onTaskDeleted={handleTaskDelete}
          />
        );
      })}
    </div>
  );
}
