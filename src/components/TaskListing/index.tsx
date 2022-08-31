import { TaskList } from './TaskList';
import { Header } from './Header';

interface TaskListingProps {
  style?: string;
}

export function TaskListing({ style }: TaskListingProps) {
  return (
    <div className={`${style ? style : ''} flex-1 bg-white`}>
      <>
        <Header />
        <TaskList />
      </>
    </div>
  );
}
