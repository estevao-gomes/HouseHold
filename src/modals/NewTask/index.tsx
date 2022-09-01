import { FormEvent, useState } from 'react';

import { Dialog } from '@headlessui/react';

import { auth } from '../../api/firebase';

import { DateListBox } from './DateListBox';
import { createTask } from '../../hooks/useApi';

interface NewTaskProps {
  isOpen: boolean;
  onNewTask: () => void;
}

export function NewTask({ isOpen, onNewTask }: NewTaskProps) {
  const [newTaskDate, setNewTaskDate] = useState(
    new Date(new Date().toDateString())
  );
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorDialog, setErrorDialog] = useState(false);

  //Handles changes on day dropdown.
  function handleDaySet(day: number) {
    var newDate = new Date(
      newTaskDate.getFullYear(),
      newTaskDate.getMonth(),
      day
    );
    setNewTaskDate(newDate);
  }

  //Handles changes on month dropdown. NewDaysInMonth variable defines if day is going to keep same value, or change. Day changes if previus date has last day of the month, and month is changed from 31 days' month to 30 days one, vice versa.
  function handleMonthSet(month: number) {
    var newDaysInMonth = new Date(
      newTaskDate.getFullYear(),
      month + 1,
      0
    ).getDate();
    setNewTaskDate(
      new Date(
        newTaskDate.getFullYear(),
        month,
        newTaskDate.getDate() > newDaysInMonth
          ? newDaysInMonth
          : newTaskDate.getDate()
      )
    );
  }

  //Handles changes on year dropdown.
  function handleYearSet(year: number) {
    setNewTaskDate(
      new Date(year, newTaskDate.getMonth(), newTaskDate.getDate())
    );
  }

  //Cheks if there is an user logged in and creates task if there is at least a task name. If there is no task name, creates error dialog (message that appears beside label).
  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      if (name === '') {
        throw new Error('Empty task name');
      }
      if (auth.currentUser) {
        createTask(newTaskDate, name, auth.currentUser.uid, description);
      } else {
        throw new Error('No user logged in');
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
    onNewTask();
    setDescription('');
  }
  return (
    //On closing submits dialog content (if there is content to submit) and sets error dialog to false if is previously set.
    <Dialog
      className="flex justify-center fixed inset-0 z-10 top-10 text-center"
      open={isOpen}
      onClose={() => {
        setErrorDialog(false);
        onNewTask();
      }}
    >
      <div className="w-[345px] h-fit bg-surface shadow">
        <Dialog.Panel>
          <Dialog.Title className="p-2 bg-primary-dark text-onPrimary font-medium">
            Nova Tarefa
          </Dialog.Title>

          <form className="flex-auto" onSubmit={handleSubmit}>
            <div className="relative grid grid-rows-2 mt-2 mx-16">
              <div className="flex z-10 items-center">
                <label
                  htmlFor="taskName"
                  className="w-16 bg-primary text-onPrimary rounded-md p-2 font-medium"
                >
                  Nome
                </label>
                {errorDialog && (
                  <span className="text-xs ml-1 text-error-600">
                    Indique um nome
                  </span>
                )}
              </div>
              <input
                id="taskName"
                className={`mx-2 -mt-2 border-2 ${
                  !errorDialog ? 'border-onSurface' : 'border-error-600'
                } p-2`}
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              ></input>
            </div>
            <div className="flex justify-center">
              <DateListBox
                date={newTaskDate}
                handleDaySet={handleDaySet}
                handleMonthSet={handleMonthSet}
                handleYearSet={handleYearSet}
              />
            </div>
            <div className="relative grid grid-rows-3 mt-2 mx-16">
              <label
                htmlFor="taskDescription"
                className="w-32 z-10 bg-primary text-onPrimary-light rounded-md p-2 font-medium"
              >
                Descrição
              </label>
              <textarea
                id="taskDescription"
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
            {/* Empties name and description states on operation canceling */}
            <button
              className="bg-surface text-error-400 font-medium rounded-xl px-2 py-1 min-w-[6rem] m-2 hover:border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-opacity-100"
              onClick={() => {
                setName('');
                setDescription('');
                setErrorDialog(false);
                onNewTask();
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
