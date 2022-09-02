import { signOut } from 'firebase/auth';
import {
  collection,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  Timestamp,
  Unsubscribe,
} from 'firebase/firestore';
import { db, auth } from '../api/firebase';
import { NoteInterface } from '../interfaces/NoteInterface';
import { ShoppingItems } from '../interfaces/ShoppingListItemsInterface';
import { TaskInterface } from '../interfaces/TaskInterface';

interface TasksProps {
  uid?: string;
  setTasks: (newTasks: TaskInterface[]) => void;
}

interface NotesProps {
  uid: string;
  setNotes: (newNotes: NoteInterface[]) => void;
}

interface ItemProps {
  uid: string;
  setShoppingItems: (newItems: ShoppingItems[]) => void;
}

//Array storing return values from Firebase listeners to be executed on log out, detatching such listeners.
const detatchers = <Unsubscribe[]>[];

//Functions to manipulate information for Task list.
//Queries database based on user id and creates watcher for changes on database for tasks collection. Sets Tasks state based on data from Firebase, while also creating "isClicked" value (not existing on database).
export async function getTasks({ uid, setTasks }: TasksProps) {
  const q = query(collection(db, 'tasks'), where('uid', '==', uid));

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      let result = <TaskInterface[]>[];

      querySnapshot.forEach((doc) => {
        result.push({
          ...doc.data(),
          id: doc.id,
          date: doc.data().date.toDate(),
          isClicked: false,
        } as TaskInterface);
      });

      setTasks(result);
    },
    (error) => {
      alert(`Erro ao obter tarefas:  ${error.message}`);
    }
  );

  detatchers.push(unsubscribe);

  return unsubscribe;
}

//Delete task with given id from database. 
export async function deleteTasks(id: string) {
  const docRef = doc(db, 'tasks', id);

  await deleteDoc(docRef);
}

//Changes value of 'isChecked' propertie of task with given id.
export async function checkTask(id: string, newIsChecked: boolean) {
  const docRef = doc(db, 'tasks', id);

  await updateDoc(docRef, {
    isChecked: newIsChecked,
  });
}

//Creates task with values of date, name and description given. Description field has an default value if not given. Creates "isChecked" value with false.
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


//Functions to manipulate data related to Notes.
//
export function getNotes({ uid, setNotes }: NotesProps) {
  const q = query(
    collection(db, 'notes'),
    where('uid', '==', uid),
    orderBy('time')
  );
  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      let result = <NoteInterface[]>[];

      querySnapshot.forEach((doc) => {
        const { name, description } = doc.data();
        result.push({
          name,
          description,
          id: doc.id,
        } as NoteInterface);
      });

      setNotes(result);
    },
    (error) => {
      alert(`Erro ao obter notas:  ${error.message}`);
    }
  );

  detatchers.push(unsubscribe);

  return unsubscribe;
}

export async function deleteNotes(id: string) {
  const docRef = doc(db, 'notes', id);

  await deleteDoc(docRef);
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
    time: Timestamp.fromDate(new Date()),
  });
}

export async function editNote(name: string, description: string, id: string) {
  const docRef = doc(db, 'notes', id);

  await updateDoc(docRef, {
    name: name,
    description: description,
  });
}


//Functions to manipulate data related to shopping list items.
export async function getShoppingList({ uid, setShoppingItems }: ItemProps) {
  const q = query(collection(db, 'shoppingList'), where('uid', '==', uid));

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      let result = <ShoppingItems[]>[];

      querySnapshot.forEach((doc) => {
        const { name, checked } = doc.data();
        result.push({
          name,
          checked,
          id: doc.id,
        } as ShoppingItems);
      });

      setShoppingItems(result);
    },
    (error) => {
      alert(`Erro ao obter lista de compras:  ${error.message}`);
    }
  );

  detatchers.push(unsubscribe);

  return unsubscribe;
}

export async function deleteItem(id: string) {
  const docRef = doc(db, 'shoppingList', id);

  await deleteDoc(docRef);
}

export async function checkItem(id: string, newChecked: boolean) {
  const docRef = doc(db, 'shoppingList', id);

  await updateDoc(docRef, {
    checked: newChecked,
  });
}

export async function createItem(name: string, uid: string) {
  await addDoc(collection(db, 'shoppingList'), {
    name: name,
    checked: false,
    uid: uid,
  });
}

//Function to execute unsubscriptions on log out.
export async function logOut() {
  detatchers.forEach((detatcher) => {
    detatcher();
  });

  //Does not log out if user is anonymous. Logging out anonymous users creates new uid on login.
  if(!auth.currentUser?.isAnonymous){
    return await signOut(auth).then((result) => {
      return result;
    });
  }
}
