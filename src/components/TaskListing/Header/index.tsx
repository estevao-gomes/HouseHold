import { useState } from 'react';
import { NewTask } from '../../../modals/NewTask';
import { DateButton } from '../DateButton';

export function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleNewTask() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="text-center bg-primary-dark text-onPrimary-dark text-xl font-bold py-4">
        Lista de Tarefas
      </div>
      <div className="flex align-items-center justify-center">
        <button
          className={`m-4 px-8 font-bold ${
            isOpen ? '' : 'bg-primary text-onPrimary-dark'
          } rounded-full h-14 hover:opacity-80 focus:opacity-80 transition-opacity`}
          type="button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Nova
        </button>
      </div>
      <DateButton />
      <NewTask isOpen={isOpen} onNewTask={handleNewTask} />
    </>
  );
}
