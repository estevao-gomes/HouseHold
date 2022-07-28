import { useEffect, useState, MouseEvent, FormEvent, useRef } from "react"
import { getShoppingList, deleteItem, checkItem, createItem } from "../../hooks/useApi"
import { ShoppingItems } from "../../interfaces/ShoppingListItemsInterface"
import { Trash } from 'phosphor-react'


interface ShoppingListProps{
    style?:string
}


export function ShoppingList({ style }: ShoppingListProps){
    const [shoppingItems, setShoppingItems] = useState<ShoppingItems[]>()
    const inputRef = useRef<HTMLInputElement>(null)

    async function getItems(){
        let response = await getShoppingList()
        console.log(response)
        setShoppingItems(response)
    }

    useEffect(()=>{    
        getItems();
    }, [])

    async function handleDeleteItem(event: MouseEvent){
        let id = event.currentTarget.parentElement?.id as string 

        const newShoppingItems = shoppingItems?.filter((item)=>item.id !== id)

        setShoppingItems(newShoppingItems)
        console.log(id)
        
        deleteItem(id)
    }

    async function handleCheckItem(event:MouseEvent){
        let id = event.currentTarget.parentElement?.id as string
        let newChecked = !shoppingItems?.find(item => item.id === id)?.checked
        
        const newShoppingItems = shoppingItems?.map((item)=>{
            if(item.id !== id){
                return item
            }else{
                return {
                    ...item,
                    checked: newChecked
                }
            }           
        })

        setShoppingItems(newShoppingItems)

        checkItem(id, newChecked)
    }

    function handleNewItem(event: FormEvent){
        event.preventDefault()
        
        let newItemName = inputRef.current ? inputRef.current.value : ""

        createItem(newItemName)

        getItems()
    }

    return(
        <div className={`${style? style : ""}`}>
            <div className="bg-primary text-center font-bold p-2">
                Shopping List
            </div>
            <div className="flex justify-center">
                <form onSubmit={handleNewItem}>
                    <label htmlFor="Novo-Item">Insira um item</label>
                    <input 
                        ref={inputRef}
                        id="Novo-Item" 
                        placeholder="Insira um item" 
                        className="w-1/2 shrink p-2 mx-2 border-b-2 border-b-primaryDark"
                    >
                    </input>
                    <button className="bg-primary text-onPrimary rounded-md p-2 m-2 hover:opacity-60">Inserir</button>
                </form>
            </div>
            <div className="last:mb-2">
                {shoppingItems?.map((item)=>{
                    return(
                        <div id={item.id} className="flex gap-2 items-center w-2/3 mx-auto mt-8 border-2 border-primary rounded-md">
                            <input onClick={handleCheckItem} className="ml-2" type="checkbox" checked={item.checked}></input>
                            <h1 className="text-xl font-semibold text-primary-dark flex-1">{item.name}</h1>
                            <button onClick={handleDeleteItem} className="mr-2"><Trash className="text-error-500"/></button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
