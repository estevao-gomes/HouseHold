interface NoteProps {
  name: string;
  description: string;
}
export function Note({ name, description }: NoteProps) {
  return (
    <div className="border-2">
      <div className="z-20 border-primary-dark bg-primary-light rounded-md w-fit px-2 mb-1">
        {name}
      </div>
      <div className="w-full border-2 p-2 border-primary-light bg-surface rounded-md max-h-[12rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-primary-dark scrollbar-track-surface">
        {description}
      </div>
    </div>
  );
}
