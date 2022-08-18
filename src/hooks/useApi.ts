import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../api/firebase';
import axios from 'axios';
import { NoteInterface } from '../interfaces/NoteInterface';
import { ShoppingItems } from '../interfaces/ShoppingListItemsInterface';
import { TaskInterface } from '../interfaces/TaskInterface';

type NoteType = {
  notes: NoteInterface[];
};

interface TasksProps {
  date?: Date;
  uid?: string;
  setTasks: (newTasks: TaskInterface[]) => void;
}

interface NotesProps {
  uid: string;
  setNotes: (newNotes: NoteInterface[]) => void;
}

interface ItemType {
  items: ShoppingItems[];
}

export async function getTasks({ date, uid, setTasks }: TasksProps) {
  const q = query(
    collection(db, 'tasks'),
    where('uid', '==', uid),
    where('date', '==', date)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let result = <TaskInterface[]>[];

    querySnapshot.forEach((doc) => {
      result.push({
        ...doc.data(),
        id: doc.id,
        date: doc.data().date.toDate(),
        isClicked: false,
      } as TaskInterface);
    });

    console.log(result);

    setTasks(result);
  });

  return unsubscribe;
}

export async function deleteTasks(id: string) {
  const docRef = doc(db, 'tasks', id);

  await deleteDoc(docRef);
}

export async function checkTask(id: string, newIsChecked: boolean) {
  const docRef = doc(db, 'tasks', id);

  await updateDoc(docRef, {
    isChecked: newIsChecked,
  });
}

export async function createTask(
  date: Date,
  name: string,
  uid: string,
  description?: string
) {
  await addDoc(collection(db, 'tasks'), {
    title: name,
    description: description ? description : name + 'description',
    date: date,
    uid: uid,
    isChecked: false,
  });
}

export async function getNotes({ uid, setNotes }: NotesProps) {
  const q = query(collection(db, 'notes'), where('uid', '==', uid));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let result = <NoteInterface[]>[];

    querySnapshot.forEach((doc) => {
      result.push({
        ...doc.data(),
        id: doc.id,
      } as NoteInterface);
    });

    console.log(result);
    console.log('watcher');

    setNotes(result);
  });

  return unsubscribe;
}

export async function deleteNotes(id: string) {
  return await axios.delete(`api/notes/${id}`).catch((error) => {
    console.log(error);
  });
}

export async function createNote(
  name: string,
  description: string,
  uid: string
) {
  await addDoc(collection(db, 'notes'), {
    name: name,
    description: description,
    uid: uid,
  });
}
export async function getShoppingList() {
  return await axios.get<ItemType>('api/items').then((response) => {
    return response.data.items;
  });
}

export async function deleteItem(id: string) {
  return await axios.delete(`api/items/${id}`).catch((error) => {
    console.log(error);
  });
}

export async function checkItem(id: string, newChecked: boolean) {
  await axios
    .patch(`api/items/${id}`, {
      checked: newChecked,
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function createItem(name: string) {
  axios
    .post('api/items', {
      name: name,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
