import { db } from '@middleware-scs3203/db';
import { createResponse } from '@middleware-scs3203/utilities';
import axios from 'axios';
import * as express from 'express';
import { json, urlencoded } from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import NotificationController from './app/controllers/notification.controller';

const app = express();

const notificationController = new NotificationController();

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
//   /notification/mail:
//     post:
//       summary: send the emails.
//       requestBody:
//         required: true
//         content:
//           application/x-www-form-urlencoded:
//             schema:
//               type: object
//               properties:
//                 email:          
//                   type: string
//                 subject:          
//                   type: string
//                 message:          
//                   type: string
//       responses:
//         '200':
//           description: The email has been sent successfully


app.post('/api/notification/mail', async (req, res) => {
    const { email, subject, message } = req.body;
    notificationController.emailNotification(email, subject, message).then((result) => {
        res.send(createResponse(result));
    } 
    ).catch((err) => {
        res.send(createResponse(err));
    });
})


// paths:
//   /notification/sms:
//     post:
//       summary: send the sms messages.
//       requestBody:
//         required: true
//         content:
//           application/x-www-form-urlencoded:
//             schema:
//               type: object
//               properties:
//                 phone:          
//                   type: string
//                 message:          
//                   type: string
//       responses:
//         '200':
//           description: The sms message has been sent successfully


app.post('/api/notification/sms', async (req, res) =>
{
    const { phone, message } = req.body;
    notificationController.smsNotification(phone, message).then((result) => {
        res.send(createResponse(result));
    } 
    ).catch((err) => {
        res.send(createResponse(err));
    });
}
)

const port = process.env.NOTIFICATION || 4222;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
