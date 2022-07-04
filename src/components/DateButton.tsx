import { Popover, Transition } from '@headlessui/react';
import { useState } from 'react';
import { useDate } from '../hooks/UseDate';
import { DateListBox } from '../shared/DateListBox';

export function DateButton() {
  const { date, UpdateDate } = useDate();
  const [newDate, setNewDate] = useState(new Date(new Date().toDateString()));

  function updateTaskList() {
    UpdateDate(newDate);
  }

  function resetNewDate() {
    setNewDate(date);
  }

  function handleDaySet(day: number) {
    setNewDate(new Date(newDate.getFullYear(), newDate.getMonth(), day));
  }

  function handleMonthSet(month: number) {
    var newDaysInMonth = new Date(
      newDate.getFullYear(),
      month + 1,
      0
    ).getDate();
    setNewDate(
      new Date(
        newDate.getFullYear(),
        month,
        newDate.getDate() > newDaysInMonth ? newDaysInMonth : newDate.getDate()
      )
    );
  }

  function handleYearSet(year: number) {
    setNewDate(new Date(year, newDate.getMonth(), newDate.getDate()));
  }
  return (
    <Popover className="flex justify-center justify-items-center items-center my-4 h-14">
      {({ open }) => (
        <>
          <Popover.Button
            onClick={open ? updateTaskList : resetNewDate}
            onKeyDown={open ? updateTaskList : resetNewDate}
            className="flex bg-primary p-4 rounded-full text-onPrimary font-bold h-14 align-items-center hover:opacity-80 focus:opacity-80 transition-opacity"
          >
            {open ? 'Confirm' : date.toLocaleDateString('pt-BR')}
          </Popover.Button>
          <Transition
            enter="transition duration-400 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-200 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="mx-4">
              <DateListBox
                date={newDate}
                handleDaySet={handleDaySet}
                handleMonthSet={handleMonthSet}
                handleYearSet={handleYearSet}
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
