import { Popover } from '@headlessui/react';
import { DateSelection } from './DateSelection';

export function DateButton() {
  return (
    //    <div className="justify-center flex items-center">
    <Popover className="flex justify-center items-center">
      <Popover.Panel >
        <DateSelection/>
      </Popover.Panel>
      <Popover.Button>
        <div className="ml-8 mt-8 bg-blue-500 p-4 rounded-full text-white font-bold">
          Date
        </div>
      </Popover.Button>
    </Popover>
  );
}
