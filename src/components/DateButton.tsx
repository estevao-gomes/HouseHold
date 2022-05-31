import { Popover } from '@headlessui/react';
import { DateSelection } from './DateSelection';
import { useState } from 'react';

export function DateButton() {
  const [date, setDate] = useState(new Date());
  return (
    <Popover className="flex justify-center justify-items-center items-center">
      <Popover.Panel className="mt-4">
        <DateSelection date={date} onDateChange={setDate} />
      </Popover.Panel>
      <Popover.Button className="mt-4 bg-blue-500 p-4 rounded-full text-white font-bold">
        {date.toLocaleDateString('pt-BR')}
      </Popover.Button>
    </Popover>
  );
}
