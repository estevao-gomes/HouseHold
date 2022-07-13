import axios from 'axios';
import { NoteInterface } from '../interfaces/NoteInterface';
import { TaskInterface } from '../interfaces/TaskInterface';

type TasksType = {
  tasks: TaskInterface[];
};

type NoteType = {
  notes: NoteInterface[];
};

interface TasksProps {
  date?: Date;
  id?: string;
}

export async function getTasks({ date }: TasksProps) {
  return await axios
    .get<TasksType>('api/tasks', { params: { date } })
    .then((response) => {
      //console.log(response.data.tasks);
      return response.data.tasks;
    });
}

export async function deleteTasks(id: string) {
  await axios.delete(`api/tasks/${id}`).catch((error) => {
    console.log(error);
  });
}

export async function checkTask(id: string, newIsChecked: boolean) {
  await axios
    .patch(`api/tasks/${id}`, {
      isChecked: newIsChecked,
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function createTask(
  date: Date,
  name: string,
  description?: string
) {
  axios
    .post('api/tasks', {
      date: date,
      title: name,
      description: description ? description : 'No description',
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function getNotes() {
  return await axios.get<NoteType>('api/notes').then((response) => {
    return response.data.notes;
  });
}

export async function deleteNotes(id: string) {
  return await axios.delete(`api/notes/${id}`).catch((error) => {
    console.log(error);
  });
}
