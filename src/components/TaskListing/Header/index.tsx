import { useState } from 'react';
import { NewTask } from '../../../modals/NewTask';
import { DateButton } from './DateButton';
import { Plus } from 'phosphor-react';

export function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleNewTask() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="text-center bg-primary-dark text-onPrimary-dark text-xl font-bold py-2">
        Lista de Tarefas
      </div>
      <DateButton />
      <div className="flex align-items-center justify-center">
        <button
          className={
            isOpen ? 'mb-2 h-8' : 'btn-primary mb-2'
          }
          type="button"
          onClick={() => {
            setIsOpen(true);
          }}
          disabled={isOpen}
        >
          {isOpen ? "" : <Plus size={16} />}
        </button>
      </div>
      <NewTask isOpen={isOpen} onNewTask={handleNewTask} />
    </>
  );
}
