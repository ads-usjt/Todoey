import express from 'express';
import cors from 'cors';

import './database/connection';

import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`💻  Server is running at port ${port}`));