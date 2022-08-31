import { useState } from 'react';
import { NewTask } from '../../../modals/NewTask';
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
      <div className="flex align-items-center justify-center">
        <button
          className="btn-primary my-2"
          type="button"
          onClick={() => {
            setIsOpen(true);
          }}
          disabled={isOpen}
        >
          <span className="pr-1 font-medium">Nova tarefa</span>
          <Plus size={16} />
        </button>
      </div>
      <NewTask isOpen={isOpen} onNewTask={handleNewTask} />
    </>
  );
}
