import { MouseEvent, useEffect, useState } from 'react';
import { Task } from './Task';

import { TaskInterface } from '../../../interfaces/TaskInterface';

import { deleteTasks, getTasks, checkTask } from '../../../hooks/useApi';
import { auth } from '../../../api/firebase';

export function TaskList() {
  const [tasks, setTasks] = useState<TaskInterface[]>([]);

  //Creates watcher for auth state changing. Gets task listing if user is logged in, else, resets Task list state. Changes
  useEffect(() => {
    async function CallApi() {
      try {
        auth.onAuthStateChanged((user) => {
          if (user) {
            let uid = user.uid;
            return getTasks({
              uid,
              setTasks,
            });
          } else {
            setTasks([]);
          }
        });
      } catch (error) {
        alert(`Erro ao obter tarefas: ${error}`);
      }
    }
    CallApi();
  }, []);

  //Checks task on Firebase with given id
  async function handleTaskChecked(event: MouseEvent) {
    let id = event.currentTarget.id;
    const newIsChecked = !(
      tasks.find((task) => task.id === id) as TaskInterface
    ).isChecked;

    await checkTask(id, newIsChecked);
  }

  //Changes "isClicked" value for task with given id on tasks state.
  function handleTaskClicked(event: MouseEvent) {
    let id = event.currentTarget.id;
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

  //Deletes task with given id
  async function handleTaskDelete(event: MouseEvent) {
    let id = event.currentTarget.id;
    await deleteTasks(id);
  }

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
