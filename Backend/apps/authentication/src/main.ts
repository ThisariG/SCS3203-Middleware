import { db } from '@middleware-scs3203/db';
import { createResponse } from '@middleware-scs3203/utilities';
import * as express from 'express';
import { json, urlencoded } from 'express';
import * as morgan from 'morgan';
import AuthController from './app/controllers/auth.cotroller';
import errorHandler from './app/middleware/error-handler';
import * as cors from 'cors';

const database = new db(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  'login'
);

const authController = new AuthController(database);
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
    'Authorization',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: 'http://localhost:3000',
  preflightContinue: false,
};

//use cors middleware
app.use(cors(options));

//add your routes

//enable pre-flight
app.options('*', cors(options));

// paths:
//   /authentication/login:
//     post:
//     summary : enter email and password to login to the system
//      requestBody:
//         required: true
//         content:
//           application/x-www-form-urlencoded:
//             schema:
//               type: object
//               properties:
//                 email:          
//                   type: string
//                 password:          
//                   type: string
//       responses:
//         200:
//           description: OK (successfully authenticated)
//         401:
//           description: Incorrect Credentials
//         1001:
//           description: User does not exist

app.post('/api/authentication/login', (req, res, next) => {
  authController
    .login(req.body.email, req.body.password)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

// paths:
//   /authentication/signup:
//     post:
//     summary : enter email and password to login to the system
//      requestBody:
//         required: true
//         content:
//           application/x-www-form-urlencoded:
//             schema:
//               type: object
//               properties:
//                 username:          
//                   type: string
//                 email:          
//                   type: string
//                 password:          
//                   type: string
//                 role:          
//                   type: string
//       responses:
//         UnauthorizedError:
//          description: Access token is missing or invalid
//         200:
//          description: Signed up

app.post('/api/authentication/signup', (req, res, next) => {
  authController
    .signup(req.body.username, req.body.email, req.body.password, req.body.role)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

// paths:
//   /authentication:
//     get:
//     summary : Verification of the tokens
//      requestBody:
//         required: true
//         content:
//           application/x-www-form-urlencoded:
//             schema:
//               type: object
//               properties:
//                 username:          
//                   type: string
//                 email:          
//                   type: string
//                 password:          
//                   type: string
//                 role:          
//                   type: string
//       responses:
//         200:
//           description: OK (The token successfully verified)
//         UnauthorizedError:
//           description: Invalid Token         

app.get('/api/authentication', (req, res, next) => {
  authController
    .authenticate(req.header('authorization'))
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

app.use(errorHandler);

const port = process.env.PORT_AUTH || 3444;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
