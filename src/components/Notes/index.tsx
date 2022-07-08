interface NotesProps {
  style?: string;
}

export function Notes({ style }: NotesProps) {
  return (
    <div className={`${style ? style : ''}`}>
      <div className="w-full bg-primary-dark text-onPrimary-dark text-center font-bold p-2">
        Notes
      </div>
      <div className="grid grid-cols-2 border-2 border-error-500">Board</div>
    </div>
  );
}
