import { useState } from 'react';
import { NewTask } from '../modals/NewTask';
import { DateButton } from './DateButton';

export function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleNewTask() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="text-center bg-primary-dark font-medium py-4">
        Lista de Balanços
      </div>
      <div className="flex align-items-center justify-center">
        <button
          className={`m-4 px-8 border-2 font-medium ${
            isOpen ? '' : 'border-primary bg-primary-dark text-onPrimary-dark'
          } rounded-full h-14`}
          type="button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Novo
        </button>
        <DateButton />
      </div>

      <NewTask isOpen={isOpen} onNewTask={handleNewTask} />
    </>
  );
}
