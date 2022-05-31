import { Popover } from '@headlessui/react';
import { DateSelection } from './DateSelection';

export function DateButton() {
  return (
    //    <div className="justify-center flex items-center">
    // <div className="ml-8 mt-8 bg-blue-500 p-4 rounded-full text-white font-bold">
    // Date
    // </div>
    // <div className="flex justify-center justify-items-center items-center">
    <Popover className="flex justify-center justify-items-center items-center">
      <Popover.Panel className="mt-4">
        <DateSelection />
      </Popover.Panel>
      <Popover.Button className="mt-4 bg-blue-500 p-4 rounded-full text-white font-bold">
        Date
      </Popover.Button>
    </Popover>
  );
}
