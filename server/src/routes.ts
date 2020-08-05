import express from 'express';
import ClassesController from './controllers/classesController';
import ConnectionController from './controllers/connectionsController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionController = new ConnectionController();

routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);

routes.post('/connections', connectionController.create)
routes.get('/connections', connectionController.index)

export default routes;