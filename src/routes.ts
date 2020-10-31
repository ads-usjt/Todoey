import { Router } from 'express';
import ReminderController from './controllers/ReminderController';
import UserController from './controllers/UserController';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({
    welcome_message: 'Todoey REST API: https://ads-usjt.github.io/Todoey'
  })
})

routes.get('/reminders', ReminderController.index);
routes.get('/reminders/:id', ReminderController.show);
routes.post('/reminders', ReminderController.create);
routes.delete('/reminders/:id', ReminderController.delete);
routes.put('/reminders/:id', ReminderController.update);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);

export default routes;