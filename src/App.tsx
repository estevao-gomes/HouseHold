import { BillsPayment, Notes, ShoppingList, TaskListing } from './components';
import { DateContextProvider } from './contexts/DateContext';


export function App() {
  return (
    <DateContextProvider>
      <div className='md:grid md:grid-cols-3'>
        <TaskListing style="border-2 border-primary mt-4 mx-2 rounded-lg shadow-xl min-h-[30rem] max-h-full" />
        <Notes style=""/>
        <ShoppingList style="border-2 border-primary mt-4 mb-2 mx-2 rounded-lg shadow-xl"/>
        {/* <BillsPayment style="md:col-span-full border-4 border-primary"/> */}
      </div>
    </DateContextProvider>
  );
}
