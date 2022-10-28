import * as express from 'express';
import { json } from 'express';
import { urlencoded } from 'express';
import * as morgan from 'morgan';
import { db } from '@middleware-scs3203/db';
import CustomerController from './app/controllers/customer.controller';
import errorHandler from './app/middleware/error-handler';
import { createResponse } from '@middleware-scs3203/utilities';
import authentication from './app/middleware/authentication';
import * as cors from 'cors';

// const database = new db('localhost', 'root', '', 'customer');

const customerController = new CustomerController();
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

app.use(
  morgan(
    '[REQUEST] :method :url :status :response-time ms - :res[content-length]',
    {}
  )
);

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

app.use(authentication);

// /customer/buy:
//     post:
//       summary: Sends payment details,delivery details and product details.
//       requestBody:products,payment details,delivery details
//         required: true
//         content:
//           application/json:
//             schema:
//        requestBody:
//         required: true
//          content:
//           application/x-www-form-urlencoded:
//             schema:
//               type: object
//               properties:
//                 products:          
//                   type: object
//                 paymentDetails:          
//                   type: object
//                 deliveryDetails:          
//                   type: object
//                 token:          
//                   type: string   
//                 email:          
//                   type: string      
//       responses:
//         '200':
//            description: Sucessfully Completed 
//              schema:
//                type:string

app.post('/api/customer/buy', (req, res, next) => {
  const { products, paymentDetails, deliveryDetails } = req.body;
  const token = req.header('authorization').split(' ').pop();
  console.log(req.user);
  customerController
    .buyItems(products, paymentDetails, deliveryDetails, token ,req.user.email)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

// paths:
//   /customer/callback{data,token}:
//     get:
//       summary: Callback confirming the details processed sucessfully
//        parameters:
//         - in: path
//           name: data
//           required: true
//           schema:
//             type: object
//         - in: path
//           name: token
//           required: true
//           schema:
//             type: string
//               responses:   
//                 '200':
//                   description: Sucessfully Completed
//                     schema:
//                       type:string

app.get('/api/customer/callback/:data/:token', async (req, res, next) => {
  const { data, token } = req.params;
  customerController
    .completePayment(data, token)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

app.use(errorHandler);

const port = process.env.CUSTOMER || 3888;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
