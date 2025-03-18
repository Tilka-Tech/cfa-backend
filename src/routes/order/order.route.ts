import express, { Router } from 'express';

import OrderController from '../../controllers/order/order.controller';
import validate from '../../validations/validate';
import orderValidation from '../../validations/order.validator';

const orderRoute: Router = express.Router();


orderRoute.post('/', validate(orderValidation.createOrder), OrderController.createOrder);

export default orderRoute;
