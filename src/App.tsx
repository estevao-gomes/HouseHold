import { BillsPayment, Notes, ShoppingList, TaskListing } from './components';
import { DateContextProvider } from './hooks/UseDate';

export function App() {
  return (
    <DateContextProvider>
      <div className='md:grid md:grid-cols-3'>
        <TaskListing style="mx-auto mt-4 min-h-[30rem] max-h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-dark scrollbar-track-surface " />
        <Notes style="border-4 border-primary"/>
        <ShoppingList style="border-4 border-primary"/>
        <BillsPayment style="md:col-span-full border-4 border-primary"/>
      </div>
    </DateContextProvider>
  );
}
