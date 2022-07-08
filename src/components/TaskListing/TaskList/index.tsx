import { MouseEvent, useEffect, useState } from 'react';
import { Task } from './Task';

import { TaskInterface } from '../../../interfaces/TaskInterface';

import { useDate } from '../../../hooks/UseDate';
import { deleteTasks, getTasks, checkTask } from '../../../hooks/useApi';

export function TaskList() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const { date } = useDate();

  useEffect(() => {
    getTasks({setTasks, date});
  }, [date]);

  function handleTaskChecked(event: MouseEvent) {
    let id = event.currentTarget.id;
    checkTask(id, tasks);

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
    //console.log(id);
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
    deleteTasks(id);
    setTasks((tasks) => {
      return tasks.filter((task) => task.id !== id);
    });
  }
  //console.log(tasks);
  return (
    <div className="grid grid-cols-8 gap-2 justify-center justify-items-center items-center">
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


