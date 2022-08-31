import { MouseEvent } from 'react';
import { Trash } from 'phosphor-react';

interface NoteProps {
  name: string;
  description: string;
  id: string;
  onNoteDelete: (event: MouseEvent) => void;
  onNoteEdit: (event: MouseEvent) => void;
}

export function Note({
  name,
  description,
  id,
  onNoteDelete,
  onNoteEdit,
}: NoteProps) {
  return (
    <div>
      <div className="flex items-center">
        <div className="bg-primary rounded-md cursor-default w-fit px-2 mb-1">
          {name}
        </div>
        <button
          id={id}
          onClick={onNoteEdit}
          className="inline ml-2 underline hover:opacity-50 hover:cursor-pointer"
        >
          Editar
        </button>
        <button
          id={id}
          onClick={onNoteDelete}
          className="text-error-500 ml-auto"
        >
          <Trash />
        </button>
      </div>
      <div className="scrollbar-thumb-round w-full border-2 p-2 border-primary-light bg-surface rounded-md max-h-[12rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-dark scrollbar-track-surface">
        {description}
      </div>
    </div>
  );
}
