const express = require('express');
const authMidlewate = require('./midlewares/auth');

const routes  = express.Router();

const EmployeeController = require('./controllers/EmployeeController');
const LoginController = require('./controllers/LoginController');


routes.post('/register', LoginController.register);
routes.post('/login', LoginController.login);

routes.use(authMidlewate);

routes.get('/employee', EmployeeController.list);
routes.post('/employee', EmployeeController.store);
routes.get('/employee/:id', EmployeeController.show);
routes.put('/employee/:id', EmployeeController.update);
routes.delete('/employee/:id', EmployeeController.destroy);

module.exports = routes;