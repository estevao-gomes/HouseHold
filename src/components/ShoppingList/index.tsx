import { useEffect, useState } from "react"

interface ShoppingListProps{
    style?:string
}

interface ShoppingItems{
    id:string,
    checked:boolean,
    name:string
}
export function ShoppingList({ style }: ShoppingListProps){
    const [shoppingItems, setShoppingItems] = useState<ShoppingItems[]>()

    useEffect(()=>{
        async function getItems(){
            let response = getShoppingList()
            setShoppingItems(response)
        }
        getItems();
    }, [])

    return(
        <div>
            <div className={`${style? style : ""}`}>
                Shopping List
            </div>
            <div className="flex justify-center">
                <input placeholder="Insira um item" className="p-2 mx-2 border-b-2 border-b-primaryDark"></input>
                <button className="bg-primary text-onPrimary rounded-md p-2 m-2 hover:opacity-60">Inserir</button>
            </div>
        </div>
    )
}


