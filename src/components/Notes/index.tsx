import { Plus } from 'phosphor-react';
import { useState, useEffect, MouseEvent } from 'react';

import { NewNote } from '../../modals/NewNote';
import { EditNote } from '../../modals/EditNote';

import {
  getNotes,
  deleteNotes,
  createNote,
  editNote,
} from '../../hooks/useApi';

import { NoteInterface } from '../../interfaces/NoteInterface';
import { Note } from './Note';
import { auth } from '../../api/firebase';

interface NotesProps {
  style?: string;
}

export function Notes({ style }: NotesProps) {
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [newNoteIsOpen, setNewNoteIsOpen] = useState<boolean>(false);
  const [editNoteIsOpen, setEditNoteIsOpen] = useState<boolean>(false);
  const [noteBeingEdited, setNoteBeingEdited] = useState<NoteInterface>(
    {} as NoteInterface
  );

  //Creates watcher for changes on auth state. If there is a user logged in, gets info from Firebase on notes for the user and sets notes state. Else, empties notes state.
  useEffect(() => {
    async function CallApi() {
      try {
        auth.onAuthStateChanged((user) => {
          if (user) {
            let uid = user.uid;
            return getNotes({
              uid,
              setNotes,
            });
          } else {
            setNotes([]);
          }
        });
      } catch (error) {
        alert(`Erro ao obter notas: ${error}`);
      }
    }
    CallApi();
  }, []);

  //Delete note with given id.
  function handleDeleteNote(event: MouseEvent) {
    const id = event.currentTarget.id;

    deleteNotes(id);
  }

  //If there is an user logged in, closes Modal for new note and calls firebase for note creation with name and description received from Modal. Else, does nothing.
  function handleNewNote(name?: string, description?: string) {
    if (auth.currentUser) {
      setNewNoteIsOpen(false);
      if (name && description) {
        createNote(name, description, auth.currentUser.uid);
      }
    }
  }

  //Gets id for note being edited, and sets noteBeingEdited with note that has said id. Opens modal for note editing.
  function handleEditNote(event: MouseEvent) {
    let id = event.currentTarget.id;
    const noteFromId = notes.find((note) => note.id === id);
    setNoteBeingEdited(noteFromId as NoteInterface);
    setEditNoteIsOpen(true);
  }

  //Receives info from note editing modal and sends to Firebase if not empty info.
  async function NoteEdit(name?: string, description?: string) {
    setEditNoteIsOpen(false);
    if (name && description) {
      await editNote(name, description, noteBeingEdited.id);
    }
  }

  return (
    <div className={`${style ? style : ''}`}>
      {/* Header */}
      <div className="flex w-full justify-between font-bold cursor-default p-2">
        <span className="text-onSurface">Notas</span>
        <button
          onClick={() => {
            setNewNoteIsOpen(true);
          }}
          className="btn-primary"
        >
          <span className="mr-2 font-medium">Nova Nota</span>
          <Plus className="inline" size={16} />
        </button>
      </div>
      {/* Notes Listing */}
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
      {/* Modals for new Notes and note editing */}
      <NewNote newNoteIsOpen={newNoteIsOpen} onNewNote={handleNewNote} />
      <EditNote
        editNoteIsOpen={editNoteIsOpen}
        EditNote={NoteEdit}
        noteBeingEdited={noteBeingEdited}
      />
    </div>
  );
}