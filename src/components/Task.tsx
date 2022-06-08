import { Check, X } from 'phosphor-react';
import { MouseEvent } from 'react';

type TaskProps = {
  id: string;
  title: string;
  description: string;
  isChecked: boolean;
  isClicked: boolean;
  onTaskChecked: (event: MouseEvent) => void;
  onTaskDeleted: (event: MouseEvent) => void;
  onTaskClicked: (event: MouseEvent) => void;
};

export function Task({
  id,
  title,
  description,
  isChecked,
  isClicked,
  onTaskChecked,
  onTaskDeleted,
  onTaskClicked,
}: TaskProps) {
  return (
    <>
      <button
        className="col-span-6 text-white font-bold p-2 min-w-[280px] text-center"
        style={{
          background: `${isChecked ? 'green' : 'blue'}`,
        }}
        id={id}
        onClick={onTaskClicked}
      >
        {title}
      </button>
      <button
        type="button"
        className="col-span-1"
        style={{
          color: `${isChecked ? 'green' : 'gray'}`,
        }}
        id={id}
        onClick={onTaskChecked}
      >
        <Check size={32} />
      </button>
      <button
        id={id}
        className="col-span-1 text-red-500"
        onClick={onTaskDeleted}
      >
        <X size={32} />
      </button>
      {isClicked && (
        <div className="col-span-8 border-4 border-slate-300">
          {description}
        </div>
      )}
    </>
  );
}
