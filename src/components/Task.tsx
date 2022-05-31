interface TaskProps {
  task: {
    title: string;
    isChecked: boolean;
    description: string;
  };
}

export function Task({ task }: TaskProps) {
  return (
    <>
      <div className="col-span-6">{task.title}</div>
      <div className="col-span-1">C</div>
      <div className="col-span-1">X</div>
    </>
  );
}
