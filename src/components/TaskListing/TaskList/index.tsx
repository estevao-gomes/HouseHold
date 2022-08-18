import { MouseEvent, useEffect, useState } from 'react';
import { Task } from './Task';

import { TaskInterface } from '../../../interfaces/TaskInterface';

import { deleteTasks, getTasks, checkTask } from '../../../hooks/useApi';
import { useDate } from '../../../contexts/DateContext';
import { useUser } from '../../../contexts/UserContext';

export function TaskList() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const { date } = useDate();
  const { uid } = useUser();

  useEffect(() => {
    async function CallApi() {
      const result = await getTasks({
        date,
        uid,
      });
      setTasks(result);
    }

    CallApi().catch(console.error);
  }, [date, uid]);

  async function handleTaskChecked(event: MouseEvent) {
    let id = event.currentTarget.id;
    const newIsChecked = !(
      tasks.find((task) => task.id === id) as TaskInterface
    ).isChecked;

    await checkTask(id, newIsChecked);

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

  async function handleTaskDelete(event: MouseEvent) {
    let id = event.currentTarget.id;
    await deleteTasks(id);
    setTasks((tasks) => {
      return tasks.filter((task) => task.id !== id);
    });
  }
  //console.log(tasks);
  return (
    <div className="grid grid-cols-8 justify-center justify-items-center items-center mx-1 max-h-72 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-primary-dark scrollbar-track-surface">
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
