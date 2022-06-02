import { Check, X } from 'phosphor-react';
import { MouseEvent } from 'react';

type TaskProps = {
  id: string;
  title: string;
  isChecked: boolean;
  onTaskChecked: (event: MouseEvent) => void;
};

export function Task({ id, title, isChecked, onTaskChecked }: TaskProps) {
  return (
    <>
      <button className="col-span-6 bg-blue-500 text-white font-bold p-2 min-w-[280px] text-center">
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
      <button className="col-span-1 text-red-500">
        <X size={32} />
      </button>
    </>
  );
}
