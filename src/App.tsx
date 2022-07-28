import { Notes, ShoppingList, TaskListing, Header } from './components';
import { DateContextProvider } from './contexts/DateContext';


export function App() {
  return (
    <DateContextProvider>
      <Header/>
      <div className='md:grid md:grid-cols-4'>
        <TaskListing style="border-2 border-primary mt-4 mx-2 rounded-lg shadow-md h-full" />
        <Notes style="col-span-2 border-2 border-primary mt-4 mx-2 rounded-lg shadow-md h-full p-2"/>
        <ShoppingList style="border-2 border-primary mt-4 mb-2 mx-2 rounded-lg shadow-md h-full"/>
        {/* <BillsPayment style="md:col-span-full border-4 border-primary"/> */}
      </div>
    </DateContextProvider>
  );
}
