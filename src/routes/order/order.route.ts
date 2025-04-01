import express, { Router } from 'express';

import OrderController from '../../controllers/order/order.controller';
import validate from '../../validations/validate';
import orderValidation from '../../validations/order.validator';

const orderRoute: Router = express.Router();


orderRoute.post('/', validate(orderValidation.createOrder), OrderController.createOrder);
// orderRoute.post('/address', validate(orderValidation.createAdress), OrderController.createAddress);
// orderRoute.put('/address/:id', OrderController.updateAddress);
// orderRoute.get('/address', OrderController.getAddress);

export default orderRoute;
