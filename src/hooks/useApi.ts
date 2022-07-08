import axios from "axios";
import { TaskInterface } from "../interfaces/TaskInterface";

type TasksType = {
    tasks: TaskInterface[]
}

interface TasksProps{
    setTasks: (tasks: TaskInterface[])=>void,
    date?: Date,
    id?: string
}

export function getTasks({setTasks, date}: TasksProps){
    axios.get<TasksType>('api/tasks', { params: { date } }).then((response) => {
        //console.log(response.data.tasks);
        setTasks(response.data.tasks);
    })
}

export function deleteTasks(id:string){
    axios.delete(`api/tasks/${id}`).catch((error) => {
        console.log(error);
      });
}

export function checkTask(id:string, tasks:TaskInterface[]){
    axios
      .patch(`api/tasks/${id}`, {
        isChecked: !(tasks.find((task) => task.id === id) as TaskInterface)
          .isChecked,
      })
      .catch((error) => {
        console.log(error);
      });
}