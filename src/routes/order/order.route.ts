import express, { Router } from 'express';

import OrderController from '../../controllers/order/order.controller';
import validate from '../../validations/validate';
import orderValidation from '../../validations/order.validator';

const orderRoute: Router = express.Router();


orderRoute.post('/', validate(orderValidation.createOrder), OrderController.createOrder);
orderRoute.put('/address/:id', OrderController.updateAddress);
orderRoute.get('/address/:id', OrderController.getAddress);
orderRoute.post('/address', validate(orderValidation.createAdress), OrderController.createAddress);
orderRoute.get('/address', OrderController.getAddreses);

export default orderRoute;
