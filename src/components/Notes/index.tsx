import { useState, useEffect, MouseEvent } from 'react';
import { getNotes, deleteNotes } from '../../hooks/useApi';

import { NoteInterface } from '../../interfaces/NoteInterface';
import { Note } from './Note';

interface NotesProps {
  style?: string;
}

export function Notes({ style }: NotesProps) {
  const [notes, setNotes] = useState<NoteInterface[]>([]);

  useEffect(() => {
    async function CallApi() {
      const response = await getNotes();

      setNotes(response);
    }

    CallApi().catch(console.error);
  }, []);

  function handleDeleteNotes(event: MouseEvent) {
    const id = event.currentTarget.id;

    setNotes((notes) => {
      return notes.filter((note) => note.id !== id);
    });

    deleteNotes(id);
  }

  return (
    <div className={`${style ? style : ''}`}>
      <div className="w-full bg-primary-dark text-onPrimary-dark text-center font-bold p-2">
        Notes
      </div>
      <div className="grid grid-cols-2 border-2 gap-2 border-error-500">
        {notes.map((note) => {
          return (
            <Note
              key={note.id}
              id={note.id}
              name={note.name}
              description={note.description}
              onNoteDelete={handleDeleteNotes}
            />
          );
        })}
      </div>
    </div>
  );
}
