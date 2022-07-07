interface ShoppingListProps{
    style?:string
}

export function ShoppingList({ style }: ShoppingListProps){
    return(
        <div className={`${style? style : ""}`}>
            Shopping List
        </div>
    )
}