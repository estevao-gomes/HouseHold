import { Check, X } from 'phosphor-react';
import { MouseEvent } from 'react';

type TaskProps = {
  id: string;
  title: string;
  isChecked: boolean;
  onTaskChecked: (event: MouseEvent) => void;
  onTaskDeleted: (event: MouseEvent) => void;
};

export function Task({
  id,
  title,
  isChecked,
  onTaskChecked,
  onTaskDeleted,
}: TaskProps) {
  return (
    <>
      <button
        className="col-span-6 text-white font-bold p-2 min-w-[280px] text-center"
        style={{
          background: `${isChecked ? 'green' : 'blue'}`,
        }}
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
    </>
  );
}
