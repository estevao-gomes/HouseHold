import { Plus } from 'phosphor-react';
import { useState, useEffect, MouseEvent } from 'react';

import { NewNote } from '../../modals/NewNote';
import { EditNote } from '../../modals/EditNote'

import { getNotes, deleteNotes } from '../../hooks/useApi';

import { NoteInterface } from '../../interfaces/NoteInterface';
import { Note } from './Note';

interface NotesProps {
  style?: string;
}

export function Notes({ style }: NotesProps) {
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [newNoteIsOpen, setNewNoteIsOpen] = useState<boolean>(false);
  const [editNoteIsOpen, setEditNoteIsOpen] = useState<boolean>(false);
  const [noteBeingEdited, setNoteBeingEdited] = useState<string>('');

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
    setNewNoteIsOpen(false);
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

  function handleEditNote(event:MouseEvent) {
    let id = event.currentTarget.id
    setNoteBeingEdited(id)
    setEditNoteIsOpen(true)
  }

  function NoteEdit(name?:string, description?:string){
    setEditNoteIsOpen(false)
    if (name && description) {
      let newNotes = notes.map((note)=>{
        if(note.id === noteBeingEdited){
          return {
            id:note.id,
            name: name,
            description:description
          }
        }else{
          return note
        }
    })
      setNotes(newNotes);
    }
  }



  return (
    <div className={`${style ? style : ''}`}>
      <div className="flex w-full justify-between font-bold cursor-default p-2">
        <span className="text-onSurface">Notas</span>
        <button
          onClick={() => {
            setNewNoteIsOpen(true);
          }}
          className="align-baseline bg-primary rounded-3xl p-2"
        >
          <span>Nova Nota</span> 
          <Plus className='inline' size={16} />
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
      <EditNote editNoteIsOpen={editNoteIsOpen} EditNote={NoteEdit}/>
    </div>
  );
}
