import { useEffect, useState, MouseEvent, FormEvent } from 'react';
import {
  getShoppingList,
  deleteItem,
  checkItem,
  createItem,
} from '../../hooks/useApi';
import { ShoppingItems } from '../../interfaces/ShoppingListItemsInterface';
import { Trash } from 'phosphor-react';
import { auth } from '../../api/firebase';

interface ShoppingListProps {
  style?: string;
}

export function ShoppingList({ style }: ShoppingListProps) {
  const [shoppingItems, setShoppingItems] = useState<ShoppingItems[]>();
  const [inputValue, setInputValue] = useState<string>('');

  //Sets watcher for auth state changes and get shopping list if user is logged in. Else, empties shopping list.
  useEffect(() => {
    function callApi() {
      try {
        auth.onAuthStateChanged((user) => {
          if (user) {
            let uid = user.uid;

            return getShoppingList({ uid, setShoppingItems });
          } else {
            setShoppingItems([] as ShoppingItems[]);
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
    callApi();
  }, []);

  //Deletes item from shopping list from given id.
  async function handleDeleteItem(event: MouseEvent) {
    let id = event.currentTarget.parentElement?.id as string;

    deleteItem(id);
  }

  //Changes checked value from shopping list item
  async function handleCheckItem(event: MouseEvent) {
    let id = event.currentTarget.parentElement?.id as string;
    let newChecked = !shoppingItems?.find((item) => item.id === id)?.checked;

    checkItem(id, newChecked);
  }

  //Creates new shopping list item if there is an inputValue and user logged in, then empties value on the input.
  function handleNewItem(event: FormEvent) {
    event.preventDefault();

    if (inputValue && auth.currentUser) {
      createItem(inputValue, auth.currentUser.uid);
      setInputValue('');
    }
  }

  return (
    <div className={`${style ? style : ''}`}>
      <div className="bg-primary rounded-t-md mt-0 text-center font-bold p-2">
        Lista de Compras
      </div>
      <div className="flex justify-center">
        <form onSubmit={handleNewItem} className="flex mt-2 justify-center">
          {/* Invisible label for new item input, for screen readers */}
          <label className="sr-only" htmlFor="Novo-Item">
            Insira um item
          </label>
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            id="Novo-Item"
            placeholder="Insira um item"
            className="flex w-1/2 shrink p-2 mx-2 border-b-2 border-b-primaryDark"
          ></input>
          <button className="btn-primary ">Inserir</button>
        </form>
      </div>
      <div className="">
        {shoppingItems?.map((item) => {
          return (
            <div
              key={item.id}
              id={item.id}
              className="flex gap-2 items-center w-2/3 mx-auto mt-8 border-2 border-primary rounded-md last:mb-2"
            >
              <input
                onClick={handleCheckItem}
                className="ml-2"
                type="checkbox"
                defaultChecked={item.checked}
              ></input>
              <h1 className="text-xl font-semibold text-primary-dark flex-1">
                {item.name}
              </h1>
              <button onClick={handleDeleteItem} className="mr-2">
                <Trash className="text-error-500" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
