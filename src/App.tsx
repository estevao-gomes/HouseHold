import { TaskListing } from './components';
import { DateContextProvider } from './hooks/UseDate';

//max-w-[42.375rem]

export function App() {
  return (
    <DateContextProvider>
      <TaskListing />
    </DateContextProvider>
  );
}
