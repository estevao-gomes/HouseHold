import { Check, X } from 'phosphor-react';
import { MouseEvent } from 'react';
import { TaskInterface } from '../interfaces/TaskInterface';

type TaskProps = {
  task: TaskInterface;
  onTaskChecked: (event: MouseEvent) => void;
  onTaskDeleted: (event: MouseEvent) => void;
  onTaskClicked: (event: MouseEvent) => void;
};

const buttonStyle = {};

export function Task({
  task,
  onTaskChecked,
  onTaskDeleted,
  onTaskClicked,
}: TaskProps) {
  return (
    <>
      <button
        className={`col-span-6 text-text-dark ${
          task.isClicked ? 'bg-main-dark' : 'bg-secondary-dark'
        } font-bold p-2 min-w-[280px] text-center`}
        id={task.id}
        onClick={onTaskClicked}
      >
        {task.title}
      </button>
      <button
        type="button"
        className="col-span-1"
        style={{
          color: `${task.isChecked ? 'green' : 'gray'}`,
        }}
        id={task.id}
        onClick={onTaskChecked}
      >
        <Check size={32} />
      </button>
      <button
        id={task.id}
        className="col-span-1 text-red-500"
        onClick={onTaskDeleted}
      >
        <X size={32} />
      </button>
      {task.isClicked && (
        <div className="col-span-8 border-4 border-slate-300 w-[90%] ml-8 p-2">
          {task.description}
        </div>
      )}
    </>
  );
}
