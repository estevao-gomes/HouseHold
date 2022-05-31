import { Listbox } from '@headlessui/react';
import { useState } from 'react';

export function DateSelection() {
  const [date, setDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState(
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  );

  const currentYear = new Date().getFullYear();

  function handleDaySet(day: number) {
    setDate((date) => {
      return new Date(date.getFullYear(), date.getMonth(), day);
    })
    console.log(date) 
  }

  function handleMonthSet(month: number) {
    var newDaysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate();
    setDate((date) => {
      return new Date(date.getFullYear(), month, date.getDate() > newDaysInMonth ? newDaysInMonth : date.getDate());
    });
    setDaysInMonth(newDaysInMonth)
    console.log(date)
  }

  function handleYearSet(year: number) {
    setDate((date) => {
      return new Date(year, date.getMonth(), date.getDate());
    })
    console.log(date) 
  }

  return (
    <div className=" mx-8 grid grid-cols-3 gap-x-4 bg-neutral-50 p-2">
      <div className="text-center">Dia</div>
      <div className="text-center">Mês</div>
      <div className="text-center">Ano</div>
      <Listbox value={date.getDate()} onChange={handleDaySet}>
        <div className="relative text-center">
          <Listbox.Button>{date.getDate()}</Listbox.Button>
          <Listbox.Options className="absolute max-h-[100px] overflow-auto">
            {[...Array(daysInMonth).keys()].map((day) => {
              return (
                <Listbox.Option key={day} value={day+1}>
                  {day+1}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </div>
      </Listbox>
      <Listbox value={date.getMonth()} onChange={handleMonthSet}>
        <div className="relative text-center">
          <Listbox.Button>{date.getMonth()+1}</Listbox.Button>
          <Listbox.Options className="absolute max-h-[100px] overflow-auto">
            {[...Array(12).keys()].map((month) => {
              return (
                <Listbox.Option key={month} value={month}>
                  {month+1}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </div>
      </Listbox>
      <Listbox value={date.getFullYear()} onChange={handleYearSet}>
        <div className="relative text-center">
          <Listbox.Button>{date.getFullYear()}</Listbox.Button>
          <Listbox.Options className="absolute max-h-[100px] overflow-auto">
            {[...Array(currentYear+1).keys()].filter((year) => year > 1989).map((year) => {
              return (
                <Listbox.Option key={year} value={year}>
                  {year}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
