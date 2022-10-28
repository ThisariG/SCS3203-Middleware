import { db } from '@middleware-scs3203/db';
import { createResponse } from '@middleware-scs3203/utilities';
import * as express from 'express';
import * as morgan from 'morgan';
import { json, urlencoded } from 'express';
import ProductController from './app/controllers/product.controller';
import errorHandler from './app/middleware/error-handler';
import authentication from './app/middleware/authentication';
import * as cors from 'cors';

const database = new db(
  process.env.DB_HOST,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  'inventory'
);

const productController = new ProductController(database);
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
//   /products/:name:
//     get:
//       summary: Returns the product with the searched name.
//       description: 
//       responses:
//         '200':
//           description: A JSON array with the object containing all the details of the product
//           content:
//             application/json:
//               schema: 
//                 type: object
//                 items: 
//                   type: string

// endpoint to get  products
app.get('/api/products/:name', (req, res, next) => {
  const name = req.params.name;
  productController
    .getProducts(name)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

// paths:
//   /products:
//     get:
//       summary: Returns the list of product list.
//       description: 
//       responses:
//         '200':
//           description: A JSON array with the list of products
//           content:
//             application/json:
//               schema: 
//                 type: array
//                 items: 
//                   type: object

app.get('/api/products', (req, res, next) => {
  productController
    .getAllProducts(req.user)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

// paths:
//   /products:
//     post:
//       summary: update a product.
//       requestBody:
//         required: true
//         content:
//           application/x-www-form-urlencoded:
//             schema:
//               type: object
//               properties:
//                 name:          
//                   type: string
//                 price:    
//                   type: string
//                 amount:          
//                   type: string
//                 image_url:    
//                   type: string
//       responses:
//         '200':
//           description: The product has been successfully added
//         '500':
//           description: Error in adding product

//endpoint to add products
app.post('/api/products', (req, res, next) => {
  const { name, price, amount, img_url } = req.body;
  productController
    .addProduct(name, price, amount, img_url, req.user)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

// paths:
//   /products/{productId}:
//     put:
//       summary: Updates a product.
//        parameters:
//         - in: query
//           name: id
//           required: true
//           schema:
//             type: string
//       requestBody:
//         required: true
//         content:
//           application/x-www-form-urlencoded:
//             schema:
//               type: object
//               properties:
//                 name:          
//                   type: string
//                 price:    
//                   type: string
//                 amount:          
//                   type: string
//                 image_url:    
//                   type: string
//       responses:
//         '200':
//           description: Product updated
//           content:
//             application/json:
//               schema: 
//                 type: object
//                 items: 
//                   type: string
//         '404':
//           description: Product not found

app.put('/api/products/:id', (req, res, next) => {
  const { name, price, amount, img_url } = req.body;
  const id = parseInt(req.params.id);

  productController
    .updateProduct(id, name, price, amount, img_url)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

// paths:
//   /products/buy:
//     post:
//       summary: Updates the amount of a product.
//        parameters:
//         - in: query
//           name: id
//           required: true
//           schema:
//             type: string
//       requestBody:
//         required: true
//         content:
//           application/x-www-form-urlencoded:
//             schema:
//               type: object
//               properties:
//                 amount:          
//                   type: string

//       responses:
//         '200':
//           description: The product updated
//         '404':
//           description: Product not Found

app.post('/api/products/buy', (req, res, next) => {
  const { products } = req.body;
  productController
    .updateAmount(products)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

// paths:
//   /products/{productId}:
//     delete:
//       summary: Deletes the  product.
//        parameters:
//         - in: query
//           name: id
//           required: true
//           schema:
//             type: string
//       responses:
//         '200':
//           description: The product amount has been successfully deleted
//           content:
//             application/json:
//               schema: 
//                 type: object
//                 items: 
//                   type: string

app.delete('/api/products/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  productController
    .deleteProduct(id)
    .then((result) => {
      res.json(createResponse(result));
    })
    .catch(next);
});

app.use(errorHandler);

const port = 4111;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
