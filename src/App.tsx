import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { DateContextProvider } from './hooks/UseDate';

export function App() {
  return (
    <div className="flex-1 bg-white max-w-[42.375rem] mx-auto mt-4 p-4 min-h-[30rem] max-h-[45rem]">
      <DateContextProvider>
        <Header />
        <TaskList />
      </DateContextProvider>
    </div>
  );
}
