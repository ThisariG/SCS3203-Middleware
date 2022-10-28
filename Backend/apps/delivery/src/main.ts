import { db } from '@middleware-scs3203/db';
import { createResponse } from '@middleware-scs3203/utilities';
import * as express from 'express';
import { json, urlencoded } from 'express';
import * as morgan from 'morgan';
import DeliveryConstroller from './app/controllers/delivery.controller';
import errorHandler from './app/middleware/error-handler';
import authentication from './app/middleware/authentication';
import * as cors from 'cors';

const database = new db(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  'delivery'
)

const deliveryController = new DeliveryConstroller(database);
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

// paths:
//   /delivery/{address}:
//     get:
//       summary: request the delivery rate.
//     parameters:
//         - in: query
//           name: address
//           required: true
//           schema:
//             type: string
//         '200':
//           description: Returns delivery rates
//           content:
//             application/json:
//               schema: 
//                 type: object
//                 items: 
//                   type: string

app.get('/api/delivery/:address', (req, res ,next) => {
  const address = req.params.address;
  deliveryController
    .getQuote(address)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

// paths:
//   /delivery:
//     post:
//       summary: request the delivery rate.
//       requestBody:
//         required: true
//         content:
//           application/x-www-form-urlencoded:
//             schema:
//               type: object
//               properties:
//                 username:          
//                   type: string
//                 address:    
//                   type: string
//                 products:          
//                   type: object
//                 deliveryPrice:    
//                   type: number
//         '200':
//           description: Delivery Successful
//            schema:
//             content:
//              type:string

app.post('/api/delivery', (req, res ,next) => {
  deliveryController
    .addDelivery(req.user.username, req.body.address, req.body.products, req.body.deliveryPrice)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});
  

app.use(errorHandler);

const port = process.env.DELIVERY||3555;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
