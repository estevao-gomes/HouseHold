import { DateContextProvider } from '../../hooks/UseDate';
import { TaskList } from './TaskList';
import { Header } from './Header';

interface TaskListingProps{
  style?: string
}

export function TaskListing({ style }: TaskListingProps) {
  return (
    <div className={`${style ? style : ""} flex-1 bg-white p-4 min-w-full`}>
      <DateContextProvider>
        <Header />
        <TaskList />
      </DateContextProvider>
    </div>
  );
}
