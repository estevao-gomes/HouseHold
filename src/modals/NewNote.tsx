import { FormEvent, useState } from 'react';

import { Dialog } from '@headlessui/react';
import { createNote } from '../hooks/useApi';

interface NewNoteProps {
  newNoteIsOpen: boolean;
  onNewNote: (name?: string, description?: string) => void;
}

export function NewNote({ newNoteIsOpen, onNewNote }: NewNoteProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [successDialog, setSuccessDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);


  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      if (name === '') {
        throw new Error('Empty task name');
      } else if (description === '') {
        throw new Error('Empty note');
      }
      onNewNote(name, description);
      await createNote(name, description);
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
    //onNewNote(name, description);
    setSuccessDialog(true);
  }
  return (
    <>
      <Dialog
        className="flex justify-center fixed inset-0 z-10 top-10 text-center"
        open={newNoteIsOpen}
        onClose={() => {
          setErrorDialog(false);
          onNewNote();
        }}
      >
        <div className="w-[345px] h-[400px] bg-surface shadow">
          <Dialog.Panel>
            <Dialog.Title className="p-2 bg-primary text-onPrimary font-medium">
              New Note
            </Dialog.Title>

            <form className="flex-auto" onSubmit={handleSubmit}>
              <div className="relative grid grid-rows-2 mt-2 mx-16">
                <div className="flex z-10 items-center">
                  <label className="w-16 bg-primary-light text-onPrimary-light rounded-md p-2 font-medium">
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
                <label className="w-32 z-10 bg-primary-light text-onPrimary-light rounded-md p-2 font-medium">
                  Descrição
                </label>
                <textarea
                  className="row-span-2 mx-2 -mt-2 border-2 border-onSurface p-2 rounded-sm scrollbar-thin scrollbar-thumb-primary-dark scrollbar-track-surface resize-none"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                ></textarea>
              </div>
              <button
                className="bg-primary text-onPrimary font-medium rounded-xl px-2 py-1 min-w-[6rem] m-2"
                type="submit"
              >
                Criar
              </button>
              <button
                className="bg-surface text-error-400 font-medium rounded-xl px-2 py-1 min-w-[6rem] m-2 border-2 border-primary"
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
      <Dialog
        as="div"
        className="fixed flex justify-center inset-0 z-10 top-10 text-center min-w-max"
        open={successDialog}
        onClose={() => setSuccessDialog(false)}
      >
        <div className="w-[345px] h-[175px] bg-surface shadow">
          <Dialog.Panel>
            <Dialog.Title className="p-2 bg-primary text-onPrimary font-medium">
              Success
            </Dialog.Title>
            <Dialog.Description className="text-primary-dark m-2 font-bold">
              Note Created Successfully
            </Dialog.Description>
            <button
              className="bg-primary text-onPrimary font-medium rounded-xl px-2 py-1 min-w-[6rem] m-2"
              onClick={() => setSuccessDialog(false)}
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
