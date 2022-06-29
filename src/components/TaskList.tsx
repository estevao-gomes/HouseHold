import { MouseEvent, useEffect, useState } from 'react';
import { Task } from './Task';
import { TaskInterface } from '../interfaces/TaskInterface';
import { useDate } from '../hooks/UseDate';

import axios from 'axios';

interface apiTasks {
  tasks: TaskInterface[];
}

export function TaskList() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const { date } = useDate();

  useEffect(() => {
    axios.get<apiTasks>('api/tasks', { params: { date } }).then((response) => {
      console.log(response.data.tasks);
      setTasks(response.data.tasks);
    });
  }, [date]);

  function handleTaskChecked(event: MouseEvent) {
    let id = event.currentTarget.id;
    axios
      .patch(`api/tasks/${id}`, {
        isChecked: !(tasks.find((task) => task.id === id) as TaskInterface)
          .isChecked,
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

  function handleTaskClicked(event: MouseEvent) {
    let id = event.currentTarget.id;
    console.log(id);
    setTasks((tasks) => {
      return tasks.map((task) => {
        return task.id === id
          ? {
              ...task,
              isClicked: !task.isClicked,
            }
          : task;
      });
    });
  }

  function handleTaskDelete(event: MouseEvent) {
    let id = event.currentTarget.id;
    axios.delete(`api/tasks/${id}`).catch((error) => {
      console.log(error);
    });
    setTasks((tasks) => {
      return tasks.filter((task) => task.id !== id);
    });
  }
  console.log(tasks);
  return (
    <div className="grid lg:grid-cols-8 md:grid-cols-4 gap-4 justify-center justify-items-center items-center min-w-max">
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            onTaskChecked={handleTaskChecked}
            onTaskDeleted={handleTaskDelete}
            onTaskClicked={handleTaskClicked}
          />
        );
      })}
    </div>
  );
}
