import { Note } from "./Note";

interface NotesProps {
  style?: string;
}

export function Notes({ style }: NotesProps) {
  const Notes = [{
    name: "Note name",
    description: "Note description"
    },
    {
      name: "Note name",
      description: "Note description"
    },
    {
      name: "Note name",
      description: "Note description"
    },
    {
      name: "Note name",
      description: "Note description"
    }]
  return (
    <div className={`${style ? style : ''}`}>
      <div className="w-full bg-primary-dark text-onPrimary-dark text-center font-bold p-2">
          Notes
      </div>
      <div className="grid grid-cols-2 border-2 gap-2 border-error-500">
        {Notes.map((note)=>{
          return <Note name={note.name} description={note.description}/>
        })}
      </div>
    </div>
  );
}
