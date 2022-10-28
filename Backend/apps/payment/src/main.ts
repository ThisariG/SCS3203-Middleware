import { db } from '@middleware-scs3203/db';
import { createResponse } from '@middleware-scs3203/utilities';
import axios from 'axios';
import * as express from 'express';
import { json, urlencoded } from 'express';
import * as morgan from 'morgan';
import PaymentController from './app/controllers/payment.controller';
import errorHandler from './app/middleware/error-handler';
import * as cors from 'cors';
import authentication from './app/middleware/authentication';

const database = new db(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  'payment'
)

const paymentController = new PaymentController(database);
const app = express();


declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: {
        email: string;
        id: string;
        username: string;
        role: string;
      };
    }
  }
}

//options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'Authorization'
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: "http://localhost:3000",
  preflightContinue: false,
};

//use cors middleware
app.use(cors(options));

//add your routes

//enable pre-flight
app.options('*', cors(options));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  morgan(
    '[REQUEST] :method :url :status :response-time ms - :res[content-length]',
    {}
  )
);

// paths:
//   /payment/card:
//     post:
//       summary: Insert the card details.
//       requestBody:
//         required: true
//         content:
//           application/x-www-form-urlencoded:
//             schema:
//               type: object
//               properties:
//                 cardNumber:          
//                   type: string
//                 cvc:          
//                   type: string
//                 cardHolder:          
//                   type: string
//                 amount:          
//                   type: string
//                 callback:          
//                   type: string
//                 email:          
//                   type: string
//       responses:
//         '200':
//           description: The card details has been sent successfully
//           content:
//             application/json:
//               schema: 
//                 type: object
//                 items: 
//                   type: string


app.post('/api/payment/card', (req, res ,next) => {
  paymentController
    .cardPayment(req.body.cardNumber, req.body.cvc, req.body.cardHolder, req.body.amount,req.body.callback,req.body.email)
    .then(async (result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

// paths:
//   /payment/mobile:
//     post:
//       summary: Insert the mobile payment details.
//       requestBody:
//         required: true
//         content:
//           application/x-www-form-urlencoded:
//             schema:
//               type: object
//               properties:
//                 mobileNumber:          
//                   type: string
//                 amount:          
//                   type: string
//                 pin:          
//                   type: string
//                 callback:          
//                   type: string
//       responses:
//         '200':
//           description: The mobile payment details has been sent successfully
//           content:
//              schema: 
//               type : string

app.post('/api/payment/mobile', (req, res ,next) => {
  paymentController
    .mobilePayment(req.body.mobileNumber, req.body.amount ,req.body.pin ,req.body.callback)
    .then(async (result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

// paths:
//   /payment/getMobilePin/{mobileNumber}:
//     get:
//       summary: Insert the mobile number and get the mobile pin.
//     parameters:
//         - in: query
//           name: mobileNumber
//           required: true
//           schema:
//             type: string
//       responses:
//         '200':
//           description: The mobile pin number has been recived
//            content:
//               schema: 
//                type : string


app.get('/api/payment/getMobilePin/:mobileNumber', (req, res ,next) => {
  paymentController
    .getMobilePaymentPin(req.params.mobileNumber)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

app.use(errorHandler);

const port = process.env.PAYMENT || 3666;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
