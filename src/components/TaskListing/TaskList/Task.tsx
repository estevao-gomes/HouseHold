import { Check, X } from 'phosphor-react';
import { MouseEvent } from 'react';
import { TaskInterface } from '../../../interfaces/TaskInterface';

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
        className={`col-span-6 bg-surface border-4 rounded-md ${
          task.isClicked ? 'border-primary-dark' : 'border-primary-light'
        } hover:border-primary font-bold text- p-2 w-full text-center
        ${task.isChecked ? 'text-checked-600' : 'text-onSurface'}`}
        id={task.id}
        onClick={onTaskClicked}
      >
        {task.title}
      </button>
      <button
        type="button"
        className={`col-span-1 rounded-md ${
          task.isChecked
            ? 'bg-checked-500 text-onChecked'
            : 'text-notChecked-500'
        } hover:border-2 border-primary`}
        id={task.id}
        onClick={onTaskChecked}
      >
        <Check size={32} />
      </button>
      <button
        id={task.id}
        className="col-span-1 text-error-500 border-2 border-surface hover:border-error-500 rounded-md p-1"
        onClick={onTaskDeleted}
      >
        <X size={24} className="text-error" />
      </button>
      {task.isClicked && (
        <div className="col-span-8 border-2 border-primary-dark rounded-md w-full p-1">
          {task.description}
        </div>
      )}
    </>
  );
}
