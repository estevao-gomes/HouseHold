import { Check, X } from 'phosphor-react';

interface TaskProps {
  task: {
    title: string;
    isChecked: boolean;
    description: string;
  };
}

export function Task({ task }: TaskProps) {
  return (
    <>
      <span className="col-span-6 bg-blue-500 text-white font-bold p-2 min-w-[280px] text-center">
        {task.title}
      </span>
      <button className="col-span-1">
        <Check size={32} />
      </button>
      <button className="col-span-1 text-red-500">
        <X size={32} />
      </button>
    </>
  );
}
