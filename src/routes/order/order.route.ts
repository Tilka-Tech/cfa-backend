import express, { Router } from 'express';

import OrderController from '../../controllers/order/order.controller';
import validate from '../../validations/validate';
import orderValidation from '../../validations/order.validator';

const orderRoute: Router = express.Router();


// Order routes
orderRoute.post('/', validate(orderValidation.createOrder), OrderController.createOrder);

// Address routes
orderRoute.post('/address', validate(orderValidation.createAdress), OrderController.createAddress);
orderRoute.get('/address', OrderController.getAddresses);
orderRoute.get('/address/:id', OrderController.getAddress);
orderRoute.put('/address/:id', OrderController.updateAddress);
orderRoute.delete('/address/:id', OrderController.deleteAddress);


export default orderRoute;
