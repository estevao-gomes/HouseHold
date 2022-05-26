import { Listbox } from '@headlessui/react';
import { useState } from 'react';

export function DateSelection() {
  const [date, setDate] = useState(new Date());

  function handleDaySet(day: number) {
    setDate((date) => {
      return new Date(day, date.getMonth(), date.getFullYear());
    });
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
            {[...Array(31).keys()].map((day) => {
              return (
                <Listbox.Option key={day} value={day}>
                  {day}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </div>
      </Listbox>
      <div>{date.getMonth()}</div>
      <div>{date.getFullYear()}</div>
    </div>
  );
}
