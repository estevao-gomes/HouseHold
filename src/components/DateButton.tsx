import { Popover } from '@headlessui/react';
import { useState } from 'react';
import { useDate } from '../hooks/UseDate';
import { DateListBox } from '../shared/DateListBox';

export function DateButton() {
  const { date, UpdateDate } = useDate();
  const [newDate, setNewDate] = useState(new Date(new Date().toDateString()));

  function updateTaskList() {
    UpdateDate(newDate);
  }

  function handleDaySet(day: number) {
    var newDate = new Date(date.getFullYear(), date.getMonth(), day);
    setNewDate(newDate);
  }

  function handleMonthSet(month: number) {
    var newDaysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate();
    setNewDate(
      new Date(
        date.getFullYear(),
        month,
        date.getDate() > newDaysInMonth ? newDaysInMonth : date.getDate()
      )
    );
  }

  function handleYearSet(year: number) {
    setNewDate(new Date(year, date.getMonth(), date.getDate()));
  }
  return (
    <Popover className="flex justify-center justify-items-center items-center my-4 h-14">
      {({ open }) => (
        <>
          <Popover.Panel className="mx-4">
            <DateListBox
              date={newDate}
              handleDaySet={handleDaySet}
              handleMonthSet={handleMonthSet}
              handleYearSet={handleYearSet}
            />
          </Popover.Panel>
          <Popover.Button
            onClick={updateTaskList}
            className="flex bg-primary p-4 rounded-full text-onPrimary font-bold h-14 align-items-center"
          >
            {open ? 'Confirm' : date.toLocaleDateString('pt-BR')}
          </Popover.Button>
        </>
      )}
    </Popover>
  );
}
