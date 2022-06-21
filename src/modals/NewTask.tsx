import axios from 'axios';
import { FormEvent, useState } from 'react';

import { Dialog } from '@headlessui/react';
import { useDate } from '../hooks/UseDate';
import { DateListBox } from '../shared/DateListBox';

interface NewTaskProps {
  isOpen: boolean;
  onNewTask: () => void;
}

export function NewTask({ isOpen, onNewTask }: NewTaskProps) {
  const { UpdateDate } = useDate();
  const [newTaskDate, setNewTaskDate] = useState(
    new Date(new Date().toDateString())
  );
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitDialog, setSubmitDialog] = useState(true);

  function handleDaySet(day: number) {
    var newDate = new Date(
      newTaskDate.getFullYear(),
      newTaskDate.getMonth(),
      day
    );
    setNewTaskDate(newDate);
  }

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

  function handleYearSet(year: number) {
    setNewTaskDate(
      new Date(year, newTaskDate.getMonth(), newTaskDate.getDate())
    );
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(name, description, newTaskDate);
    axios
      .post('api/tasks', {
        date: newTaskDate,
        title: name,
        description: description,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    UpdateDate(newTaskDate);
    onNewTask();
    setSubmitDialog(true);
  }
  return (
    <>
      <Dialog
        as="div"
        className="absolute z-10 top-20 right-1/3 left-1/3 bg-slate-100 text-center m-4 max-w-[33%] bg-surface shadow"
        open={isOpen}
        onClose={onNewTask}
      >
        <Dialog.Panel>
          <Dialog.Title className="p-2 bg-primary text-onPrimary font-medium">
            New Task
          </Dialog.Title>

          <form className="flex-auto" onSubmit={handleSubmit}>
            <div className="relative grid grid-rows-2 mt-2 mx-16">
              <label className="w-16 z-10 bg-primary-light text-onPrimary-light rounded-md p-2 font-medium">
                Nome
              </label>
              <input
                className="mx-2 -mt-2 border-2 border-onSurface p-2 min-w-16"
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
              <label className="w-32 z-10 bg-primary-light text-onPrimary-light rounded-md p-2 font-medium">
                Descrição
              </label>
              <textarea
                className="row-span-2 mx-2 -mt-2 border-2 border-onSurface p-2 min-w-16 rounded-sm scrollbar-thin scrollbar-thumb-primary-dark scrollbar-track-surface resize-none"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></textarea>
            </div>
            <button
              className="bg-primary text-onPrimary font-medium rounded-xl px-2 py-1 min-w-[100px] m-2"
              type="submit"
            >
              Criar
            </button>
            <button
              className="bg-surface text-error-400 font-medium rounded-xl px-2 py-1 min-w-[100px] m-2 border-2 border-primary"
              onClick={onNewTask}
            >
              Cancelar
            </button>
          </form>
        </Dialog.Panel>
      </Dialog>
      <Dialog
        as="div"
        className="absolute z-10 top-20 right-1/3 left-1/3 bg-slate-100 text-center m-4 max-w-[33%] bg-surface shadow"
        open={submitDialog}
        onClose={() => setSubmitDialog(false)}
      >
        <Dialog.Panel>
          <Dialog.Title className="p-2 bg-primary text-onPrimary font-medium">
            Success
          </Dialog.Title>
          <Dialog.Description className="text-primary-dark m-2 font-bold">
            Task Created Successfully
          </Dialog.Description>
          <button
            className="bg-primary text-onPrimary font-medium rounded-xl px-2 py-1 min-w-[100px] m-2"
            onClick={() => setSubmitDialog(false)}
          >
            Close
          </button>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
