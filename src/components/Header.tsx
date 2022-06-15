import { useState } from 'react';
import { NewTask } from '../modals/NewTask';

export function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleNewTask() {
    setIsOpen(false);
  }

  return (
    <>
      <div className="flex align-items-center justify-center">
        <button
          className={`m-2 py-2 px-8 border-2 font-medium ${
            isOpen
              ? 'border-primary-light bg-surface'
              : 'border-primary bg-primary text-onPrimary'
          } rounded-full min-w-[90px]`}
          type="button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Novo
        </button>
      </div>
      <NewTask isOpen={isOpen} onNewTask={handleNewTask} />
    </>
  );
}
//onKeyDown={() => {
//  setIsOpen((oldIsOpen)=>!oldIsOpen)
//}}
