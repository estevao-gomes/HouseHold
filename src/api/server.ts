import { createServer, Model } from 'miragejs';
import { NoteInterface } from '../interfaces/NoteInterface';
import { ShoppingItems } from '../interfaces/ShoppingListItemsInterface';
import { TaskInterface } from '../interfaces/TaskInterface';

export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,

    models: {
      task: Model.extend<Partial<TaskInterface>>({}),
      note: Model.extend<Partial<NoteInterface>>({}),
      items: Model.extend<Partial<ShoppingItems>>({})
    },

    seeds(server) {
      server.create('task', {
        id: '1',
        title: 'Tarefa 1',
        isChecked: false,
        description: 'Task 1',
        date: new Date(new Date().toDateString()),
      });
      server.create('task', {
        id: '2',
        title: 'Tarefa 2',
        isChecked: true,
        description: 'Task 2',
        date: new Date(new Date().toDateString()),
      });
      server.create('task', {
        id: '3',
        title: 'Tarefa 3',
        isChecked: false,
        description: 'Task 3',
        date: new Date(new Date('2022, 04, 12').toDateString()),
      });
      server.create('task', {
        id: '4',
        title: 'Tarefa 4',
        isChecked: false,
        description: 'Task 4',
        date: new Date(new Date().toDateString()),
      });
      server.create('task', {
        id: '5',
        title: 'Tarefa 5',
        isChecked: true,
        description: 'Task 5',
        date: new Date(new Date().toDateString()),
      });
      server.create('task', {
        id: '6',
        title: 'Tarefa 6',
        isChecked: false,
        description: 'Task 6',
        date: new Date(new Date('2021, 04, 12').toDateString()),
      });
      server.create('note', {
        id: '1',
        name: 'Note1 ',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      });
      server.create('note', {
        id: '2',
        name: 'Note 2',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      });
      server.create('note', {
        id: '3',
        name: 'Note 3',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      });
      server.create('note', {
        id: '4',
        name: 'Note 4',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      });
      server.create('item', {
        id: '1',
        name: 'Arroz',
        checked: false
      });
      server.create('item', {
        id: '2',
        name: 'Feijão',
        checked:true
      });
    },

    routes() {
      this.namespace = 'api';

      this.post('/tasks', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        attrs.id = Math.floor(Math.random() * 1000);
        attrs.date = new Date(attrs.date);
        schema.create('tasks', attrs);
        return { task: attrs };
      });

      this.get('/tasks', (schema, request) => {
        let dateParam = request.queryParams.date;
        return schema.tasks.where({ date: new Date(dateParam) });
      });

      this.patch('/tasks/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;

        let tasks = schema.tasks.find(id);

        return tasks.update(newAttrs);
      });

      this.delete('/tasks/:id', (schema, request) => {
        let id = request.params.id;

        return schema.tasks.find(id).destroy();
      });

      this.get('/notes', (schema, request) => {
        return schema.notes.all();
      });

      this.delete('/notes/:id', (schema, request) => {
        let id = request.params.id;

        return schema.notes.find(id).destroy();
      });

      this.post('/notes', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        attrs.id = Math.floor(Math.random() * 1000);
        schema.create('tasks', attrs);
        return { note: attrs };
      });

      this.get('/items', (schema, request) => {
        return schema.all('items');
      })
      this.delete('/items/:id', (schema, request) => {
        let id = request.params.id;

        return schema.items.find(id).destroy();
      });
      this.patch('/items/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;

        let tasks = schema.items.find(id);

        return tasks.update(newAttrs);
      });
    },
  });

  return server;
}
