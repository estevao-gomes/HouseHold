interface NoteProps {
  name: string;
  description: string;
}
export function Note({ name, description }: NoteProps) {
  return (
    <div className="border-2">
      <div className="z-20 border-primary-dark bg-primary-light rounded-md w-fit px-1 -mb-1">
        {name}
      </div>
      <div className="-mt-1 w-full border-2 border-primary-light bg-surface rounded-md">
        {description}
      </div>
    </div>
  );
}
