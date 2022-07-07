interface NotesProps{
    style?:string
}

export function Notes({ style }: NotesProps){
    return(
        <div className={`${style? style : ""}`}>
            Notes
        </div>
    )
}