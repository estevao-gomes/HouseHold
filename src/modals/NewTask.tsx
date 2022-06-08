import { Dialog } from '@headlessui/react';
import axios from 'axios';
import { FormEvent, useState } from 'react';
import { DateListBox } from '../shared/DateListBox';

interface NewTaskProps {
  isOpen: boolean;
  onNewTask: () => void;
}

export function NewTask({ isOpen, onNewTask }: NewTaskProps) {
  const [date, setDate] = useState(new Date(new Date().toDateString()));
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitDialog, setSubmitDialog] = useState(false);

  function handleDaySet(day: number) {
    var newDate = new Date(date.getFullYear(), date.getMonth(), day);
    setDate(newDate);
  }

  function handleMonthSet(month: number) {
    var newDaysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate();
    setDate(
      new Date(
        date.getFullYear(),
        month,
        date.getDate() > newDaysInMonth ? newDaysInMonth : date.getDate()
      )
    );
  }

  function handleYearSet(year: number) {
    setDate(new Date(year, date.getMonth(), date.getDate()));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(name, description, date);
    axios
      .post('api/tasks', {
        date: date,
        name: name,
        description: description,
        id: '7',
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    onNewTask();
    setSubmitDialog(true);
  }
  return (
    <>
      <Dialog
        as="div"
        className="relative z-10 bg-slate-100 text-center m-4"
        open={isOpen}
        onClose={onNewTask}
      >
        <Dialog.Panel>
          <Dialog.Title>New Task</Dialog.Title>
          <Dialog.Description>Insert New Task</Dialog.Description>
          <DateListBox
            date={date}
            handleDaySet={handleDaySet}
            handleMonthSet={handleMonthSet}
            handleYearSet={handleYearSet}
          />
          <form onSubmit={handleSubmit}>
            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            ></input>
            <label>Descrição</label>
            <input
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></input>
            <button type="submit">Criar</button>
          </form>
          <button onClick={onNewTask}>Cancel</button>
        </Dialog.Panel>
      </Dialog>
      <Dialog
        as="div"
        className="relative z-10 bg-slate-100 text-center m-4"
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
