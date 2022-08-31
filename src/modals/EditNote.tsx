import { FormEvent, useState, useRef } from 'react';

import { Dialog } from '@headlessui/react';

import { NoteInterface } from '../interfaces/NoteInterface';

interface EditNoteProps {
  editNoteIsOpen: boolean;
  EditNote: (name?: string, description?: string) => void;
  noteBeingEdited: NoteInterface;
}

export function EditNote({
  editNoteIsOpen,
  EditNote,
  noteBeingEdited,
}: EditNoteProps) {
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const [errorDialog, setErrorDialog] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    //Checks if inputs references are set correctly. If they are, checks if the values are empty, if they are, throws error. Else, edits note on Firebase with given values.
    try {
      if (nameRef.current && descriptionRef.current) {
        if (nameRef.current.value === '') {
          throw new Error('Empty task name');
        } else if (descriptionRef.current.value === '') {
          throw new Error('Empty note');
        }
        EditNote(nameRef.current.value, descriptionRef.current.value);
      } else {
        throw new Error('Unknown Error');
      }
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
  }

  //Inputs are uncontrolled due to needing to have a default value dependent on props. Having controlled inputs would require derived states, causing double rendering of component.
  return (
    <Dialog
      className="flex justify-center fixed inset-0 z-10 top-10 text-center"
      open={editNoteIsOpen}
      onClose={() => {
        setErrorDialog(false);
      }}
    >
      <div className="w-[345px] h-[400px] bg-surface shadow">
        <Dialog.Panel>
          <Dialog.Title className="p-2 bg-primary text-onPrimary font-medium">
            Editar Nota
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
                ref={nameRef}
                defaultValue={noteBeingEdited.name}
              ></input>
            </div>
            <div className="relative grid grid-rows-3 mt-2 mx-16">
              <label className="w-32 z-10 bg-primary-light text-onPrimary-light rounded-md p-2 font-medium">
                Descrição
              </label>
              <textarea
                className="row-span-2 mx-2 -mt-2 border-2 border-onSurface p-2 rounded-sm scrollbar-thin scrollbar-thumb-primary-dark scrollbar-track-surface resize-none"
                ref={descriptionRef}
                defaultValue={noteBeingEdited.description}
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
                setErrorDialog(false);
                EditNote();
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
