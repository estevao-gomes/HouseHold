import { Notes, ShoppingList, TaskListing, Header } from './components';

export function App() {
  return (
    <>
      <Header />
      <div className="md:grid md:grid-cols-4">
        <TaskListing style="mt-4 mx-2 pb-2 rounded-xl shadow-lg min-h-max h-full" />
        <Notes style="col-span-2 border-2 pb-2 border-primary mt-4 mx-2 rounded-lg shadow-md h-full p-2" />
        <ShoppingList style="mt-4 mb-2 pb-2 mx-2 rounded-lg shadow-lg h-full" />
      </div>
    </>
  );
}
