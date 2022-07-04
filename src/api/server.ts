import { createServer, Model } from 'miragejs';
import { TaskInterface } from '../interfaces/TaskInterface';

export function makeServer({ environment = 'test' } = {}) {
  let server = createServer({
    environment,

    models: {
      task: Model.extend<Partial<TaskInterface>>({}),
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
    },

    routes() {
      this.namespace = 'api';

      this.post('/tasks', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        attrs.id = Math.floor(Math.random() * 1000);
        attrs.date = new Date(attrs.date);
        schema.tasks.create(attrs);
        return { task: attrs };
      });

      this.get('/tasks', (schema, request) => {
        let dateParam = request.queryParams.date;
        //return schema.tasks.all();
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
    },
  });

  return server;
}
