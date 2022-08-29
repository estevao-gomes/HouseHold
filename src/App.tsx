import { Notes, ShoppingList, TaskListing, Header } from './components';
import { DateContextProvider } from './contexts/DateContext';


export function App() {
  return (
    <>
      <Header />
      <div className="md:grid md:grid-cols-4">
        <DateContextProvider>
          <TaskListing style="border-2 border-primary mt-4 mx-2 rounded-lg shadow-md min-h-max h-full" />
        </DateContextProvider>
        <Notes style="col-span-2 border-2 border-primary mt-4 mx-2 rounded-lg shadow-md h-full p-2" /> 
        <ShoppingList style="border-2 border-primary mt-4 mb-2 mx-2 rounded-lg shadow-md h-full" />
      </div>
    </>
  );
}
