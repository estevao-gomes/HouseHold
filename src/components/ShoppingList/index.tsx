import { useEffect, useState, MouseEvent, FormEvent, useRef } from "react"
import { getShoppingList, deleteItem, checkItem, createItem } from "../../hooks/useApi"
import { ShoppingItems } from "../../interfaces/ShoppingListItemsInterface"
import { Trash } from 'phosphor-react'
import { useUser } from "../../contexts/UserContext"


interface ShoppingListProps{
    style?:string
}


export function ShoppingList({ style }: ShoppingListProps){
    const [shoppingItems, setShoppingItems] = useState<ShoppingItems[]>()
    const inputRef = useRef<HTMLInputElement>(null)

    const { uid } = useUser();

    useEffect(()=>{
        function callApi(){
            getShoppingList({uid, setShoppingItems});
        }
        callApi()        
    }, [uid])

    async function handleDeleteItem(event: MouseEvent){
        let id = event.currentTarget.parentElement?.id as string 
        
        deleteItem(id)
    }

    async function handleCheckItem(event:MouseEvent){
        let id = event.currentTarget.parentElement?.id as string
        let newChecked = !shoppingItems?.find(item => item.id === id)?.checked

        checkItem(id, newChecked)
    }

    function handleNewItem(event: FormEvent){
        event.preventDefault()
        
        let newItemName = inputRef.current ? inputRef.current.value : ""

        createItem(newItemName, uid)
    }

    return(
        <div className={`${style? style : ""}`}>
            <div className="bg-primary text-center font-bold p-2">
                Lista de Compras
            </div>
            <div className="flex justify-center">
                <form onSubmit={handleNewItem} className="flex mt-2 justify-center">
                    {/* <label htmlFor="Novo-Item">Insira um item</label> */}
                    <input 
                        ref={inputRef}
                        id="Novo-Item" 
                        placeholder="Insira um item" 
                        className="flex w-1/2 shrink p-2 mx-2 border-b-2 border-b-primaryDark"
                    >
                    </input>
                    <button className="btn-primary ">Inserir</button>
                </form>
            </div>
            <div className="last:mb-2">
                {shoppingItems?.map((item)=>{
                    return(
                        <div key={item.id} id={item.id} className="flex gap-2 items-center w-2/3 mx-auto mt-8 border-2 border-primary rounded-md">
                            <input onClick={handleCheckItem} className="ml-2" type="checkbox" defaultChecked={item.checked}></input>
                            <h1 className="text-xl font-semibold text-primary-dark flex-1">{item.name}</h1>
                            <button onClick={handleDeleteItem} className="mr-2"><Trash className="text-error-500"/></button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
