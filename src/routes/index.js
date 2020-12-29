const {Router} = require('express');
const authenticate = require('./auth.js');

const countryController = require('../controllers/Country/controller');
const userController = require('../controllers/User/controller');
const slotMachineController = require('../controllers/Slotmachine/controller');

const routes = Router();

routes.get('/country/findAll', countryController.findAll);
routes.get('/country/find/:countryName', countryController.findCountry);
routes.post('/country/findMany', countryController.findMany);
routes.post('/auth/register', userController.register);
routes.post('/auth/login', userController.login);
routes.post('/auth/token', authenticate.withJwt, userController.loginWithToken);
routes.post('/slotMachine/spin', authenticate.withJwt, slotMachineController.spin);

module.exports = routes;