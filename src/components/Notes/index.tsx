import { Plus } from 'phosphor-react';
import { useState, useEffect, MouseEvent } from 'react';

import { NewNote } from '../../modals/NewNote';

import { getNotes, deleteNotes } from '../../hooks/useApi';

import { NoteInterface } from '../../interfaces/NoteInterface';
import { Note } from './Note';

interface NotesProps {
  style?: string;
}

export function Notes({ style }: NotesProps) {
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    async function CallApi() {
      const response = await getNotes();

      setNotes(response);
    }

    CallApi().catch(console.error);
  }, []);

  function handleDeleteNote(event: MouseEvent) {
    const id = event.currentTarget.id;

    setNotes((notes) => {
      return notes.filter((note) => note.id !== id);
    });

    deleteNotes(id);
  }

  function handleNewNote(name?: string, description?: string) {
    setIsOpen(false);
    if (name && description) {
      const newNotes = [
        ...notes,
        {
          name: name,
          description: description,
        } as NoteInterface,
      ];

      setNotes(newNotes);
    }
  }

  return (
    <div className={`${style ? style : ''}`}>
      <div className="w-full bg-primary-dark text-onPrimary-dark text-center font-bold cursor-default p-2">
        Notes
        <button
          onClick={() => {
            setIsOpen(true);
          }}
          className="ml-auto"
        >
          <Plus size={24} />
        </button>
      </div>
      <div className="grid grid-cols-2 border-2 gap-2 border-error-500 max-h-[30rem] overflow-y-scroll scroll-p-6 scrollbar-thin scrollbar-thumb-primary-dark scrollbar-track-surface">
        {notes.map((note) => {
          return (
            <Note
              key={note.id}
              id={note.id}
              name={note.name}
              description={note.description}
              onNoteDelete={handleDeleteNote}
            />
          );
        })}
      </div>
      <NewNote isOpen={isOpen} onNewNote={handleNewNote} />
    </div>
  );
}
