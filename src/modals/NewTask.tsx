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
  const [submitDialog, setSubmitDialog] = useState(false);

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
            <div className="">
              <DateListBox
                date={newTaskDate}
                handleDaySet={handleDaySet}
                handleMonthSet={handleMonthSet}
                handleYearSet={handleYearSet}
              />
            </div>
            <div className="relative grid grid-rows-3 mt-2 mx-16">
              <label className="w-32 z-10 bg-primary-light text-onPrimary-light rounded-md p-2 font-medium">Descrição</label>
              <input
                className="row-span-2 mx-2 -mt-2 border-2 border-onSurface p-2 min-w-16 overflow-auto"
                type="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              ></input>
            </div>
            <button type="submit">Criar</button>
          </form>
          <button onClick={onNewTask}>Cancelar</button>
        </Dialog.Panel>
      </Dialog>
      <Dialog
        as="div"
        className="absolute y-1 z-10 bg-slate-100 text-center m-4"
        open={submitDialog}
        onClose={() => setSubmitDialog(false)}
      >
        <Dialog.Panel>
          <Dialog.Title>Task Created</Dialog.Title>
          <Dialog.Description>Task Created Successfully</Dialog.Description>
          <button onClick={() => setSubmitDialog(false)}>Close</button>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
