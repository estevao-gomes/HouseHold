import axios from "axios";
import { TaskInterface } from "../interfaces/TaskInterface";

type TasksType = {
    tasks: TaskInterface[]
}

interface GetTasksProps{
    setTasks: (tasks: TaskInterface[])=>void,
    date: Date
}

export function getDate({setTasks, date}: GetTasksProps){
    axios.get<TasksType>('api/tasks', { params: { date } }).then((response) => {
        //console.log(response.data.tasks);
        setTasks(response.data.tasks);
    })
}