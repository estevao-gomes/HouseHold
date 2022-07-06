import { DateContextProvider } from '../../hooks/UseDate';
import { TaskList } from './TaskList';
import { Header } from './Header';

export function TaskListing() {
  return (
    <div className="flex-1 bg-white md:w-1/3 mx-auto mt-4 p-4 min-h-[30rem] max-h-[45rem]">
      <DateContextProvider>
        <Header />
        <TaskList />
      </DateContextProvider>
    </div>
  );
}
