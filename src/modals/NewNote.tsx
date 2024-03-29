import { FormEvent, useState } from 'react';

import { Dialog } from '@headlessui/react';

interface NewNoteProps {
  newNoteIsOpen: boolean;
  onNewNote: (name?: string, description?: string) => void;
}

export function NewNote({ newNoteIsOpen, onNewNote }: NewNoteProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorDialog, setErrorDialog] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    //Checks if name or description are empty, if they are, throws error, else creates note from given values and empties name and description fields.
    try {
      if (name === '') {
        throw new Error('Empty task name');
      } else if (description === '') {
        throw new Error('Empty note');
      }
      onNewNote(name, description);
    } catch (error) {
      let message;

      if (error instanceof Error) {
        message = error.message;
      } else message = String(error);

      console.log(message);

      setErrorDialog(true);

      return;
    }
    setErrorDialog(false);
    setDescription('');
    setName('');
  }
  return (
    <Dialog
      className="flex justify-center fixed inset-0 z-10 top-10 text-center"
      open={newNoteIsOpen}
      onClose={() => {
        setErrorDialog(false);
      }}
    >
      <div className="w-[345px] h-fit bg-surface shadow">
        <Dialog.Panel>
          <Dialog.Title className="p-2 bg-primary-dark text-onPrimary font-medium">
            Nova Nota
          </Dialog.Title>

          <form className="flex-auto" onSubmit={handleSubmit}>
            <div className="relative grid grid-rows-2 mt-2 mx-16">
              <div className="flex z-10 items-center">
                <label className="w-16 bg-primary text-onPrimary-light rounded-md p-2 font-medium">
                  Nome
                </label>
                {errorDialog && (
                  <span className="text-xs ml-1 mb-2 text-error-600">
                    Nome e/ou descrição vazios.
                  </span>
                )}
              </div>
              <input
                className={`mx-2 -mt-2 border-2 ${
                  !errorDialog ? 'border-onSurface' : 'border-error-600'
                } p-2`}
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              ></input>
            </div>
            <div className="relative grid grid-rows-3 mt-2 mx-16">
              <label className="w-32 z-10 bg-primary text-onPrimary-light rounded-md p-2 font-medium">
                Descrição
              </label>
              <textarea
                className="row-span-2 mx-2 -mt-2 border-2 border-onSurface p-2 rounded-sm scrollbar-thin scrollbar-thumb-primary-dark scrollbar-track-surface resize-none"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>
            <button
              className="btn-primary inline font-medium min-w-[6rem] m-2"
              type="submit"
            >
              Criar
            </button>
            <button
              className="bg-surface text-error-400 font-medium rounded-xl px-2 py-1 min-w-[6rem] m-2 hover:border-2 border-primary"
              onClick={() => {
                setName('');
                setDescription('');
                setErrorDialog(false);
                onNewNote();
              }}
            >
              Cancelar
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
