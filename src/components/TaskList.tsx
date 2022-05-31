import { Task } from './Task';

const tasks = [
  {
    title: 'Task 1',
    isChecked: false,
    description: 'Task 1 description to be inserted',
    id: 1,
  },
  {
    title: 'Task 2',
    isChecked: false,
    description: 'Task 2 description to be inserted',
    id: 2
  },
  {
    title: 'Task 3',
    isChecked: false,
    description: 'Task 3 description to be inserted',
    id: 3
  },
];

export function TaskList() {
  return (
    <div className="grid grid-cols-8 gap-4 mt-8 justify-center justify-items-center">
      {tasks.map((task) => {
        return (
          <Task task={task} key={task.id}/>
        )})}
    </div>
  )};
