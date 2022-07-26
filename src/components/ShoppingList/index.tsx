import { useEffect, useState, MouseEvent } from "react"
import { getShoppingList, deleteItem, checkItem } from "../../hooks/useApi"
import { ShoppingItems } from "../../interfaces/ShoppingListItemsInterface"
import { Trash } from 'phosphor-react'

interface ShoppingListProps{
    style?:string
}


export function ShoppingList({ style }: ShoppingListProps){
    const [shoppingItems, setShoppingItems] = useState<ShoppingItems[]>()

    useEffect(()=>{
        async function getItems(){
            let response = await getShoppingList()
            console.log(response)
            setShoppingItems(response)
        }
        getItems();
    }, [])

    async function handleDeleteItem(event: MouseEvent){
        let id = event.currentTarget.parentElement?.id as string 

        console.log(id)
        
        deleteItem(id)
    }

    async function handleCheckItem(event:MouseEvent){}

    return(
        <div>
            <div className={`${style? style : ""}`}>
                Shopping List
            </div>
            <div className="flex justify-center">
                <input placeholder="Insira um item" className="p-2 mx-2 border-b-2 border-b-primaryDark"></input>
                <button className="bg-primary text-onPrimary rounded-md p-2 m-2 hover:opacity-60">Inserir</button>
            </div>
            <div>
                {shoppingItems?.map((item)=>{
                    return(
                        <div id={item.id} className="flex gap-2 items-center w-2/3 mx-auto mt-8 border-2 border-primary rounded-md">
                            <input className="ml-2" type="checkbox"></input>
                            <h1 className="text-xl font-semibold text-primary-dark flex-1">{item.name}</h1>
                            <button onClick={handleDeleteItem} className="mr-2"><Trash className="text-error-500"/></button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
