import express from 'express';
import cors from 'cors';

import './database/connection';

import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3333;
const baseUrl = process.env.NODE_ENV === 'production' ? 'https://todoey-rest.herokuapp.com' : 'http://localhost'

app.listen(port,
  () => console.log(`💻  Server is running at ${baseUrl}:${port}/`)
);