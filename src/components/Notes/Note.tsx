interface NoteProps{
    name: string,
    description: string
}
export function Note({name, description}:NoteProps){
    return(
        <div className="w-full border-2">
            <div className="">{name}</div>
            <div className="">{description}</div>
        </div>
    )
}