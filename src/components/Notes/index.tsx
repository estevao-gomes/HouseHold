import { Plus } from 'phosphor-react';
import { useState, useEffect, MouseEvent } from 'react';

import { NewNote } from '../../modals/NewNote';
import { EditNote } from '../../modals/EditNote';

import { getNotes, deleteNotes, createNote, editNote } from '../../hooks/useApi';
import { useUser } from '../../contexts/UserContext';

import { NoteInterface } from '../../interfaces/NoteInterface';
import { Note } from './Note';

//import { snapshot } from '../../api/firebase'

interface NotesProps {
  style?: string;
}

export function Notes({ style }: NotesProps) {
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [newNoteIsOpen, setNewNoteIsOpen] = useState<boolean>(false);
  const [editNoteIsOpen, setEditNoteIsOpen] = useState<boolean>(false);
  const [noteBeingEdited, setNoteBeingEdited] = useState<string>('');

  const { uid } = useUser();

  useEffect(() => {
    async function CallApi() {
      if(uid){
        const result = getNotes({
          uid,
          setNotes,
        });
      }
    }
    CallApi().catch(console.error);
  }, [uid]);

  function handleDeleteNote(event: MouseEvent) {
    const id = event.currentTarget.id;

    deleteNotes(id);
  }

  function handleNewNote(name: string, description: string) {
    setNewNoteIsOpen(false);
    createNote(name, description, uid);
  }

  function handleEditNote(event: MouseEvent) {
    let id = event.currentTarget.id;
    setNoteBeingEdited(id);
    setEditNoteIsOpen(true);
  }

  async function NoteEdit(name?: string, description?: string) {
    setEditNoteIsOpen(false);
    if(name && description){
      await editNote(name, description, noteBeingEdited)
    }
    // if (name && description) {
    //   let newNotes = notes.map((note) => {
    //     if (note.id === noteBeingEdited) {
    //       return {
    //         id: note.id,
    //         name: name,
    //         description: description,
    //       };
    //     } else {
    //       return note;
    //     }
    //   });
    //   setNotes(newNotes);
    // }
  }

  return (
    <div className={`${style ? style : ''}`}>
      <div className="flex w-full justify-between font-bold cursor-default p-2">
        <span className="text-onSurface">Notas</span>
        <button
          onClick={() => {
            setNewNoteIsOpen(true);
          }}
          className="btn-primary"
        >
          <span className='mr-2'>Nova Nota</span>
          <Plus className="inline" size={16} />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 max-h-[30rem] overflow-y-scroll scroll-p-6 scrollbar-thin scrollbar-thumb-primary-dark scrollbar-track-surface">
        {notes.map((note) => {
          return (
            <Note
              key={note.id}
              id={note.id}
              name={note.name}
              description={note.description}
              onNoteDelete={handleDeleteNote}
              onNoteEdit={handleEditNote}
            />
          );
        })}
      </div>
      <NewNote newNoteIsOpen={newNoteIsOpen} onNewNote={handleNewNote} />
      <EditNote editNoteIsOpen={editNoteIsOpen} EditNote={NoteEdit} />
    </div>
  );
}
