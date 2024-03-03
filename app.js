import dotenv from 'dotenv';
import express from 'express';
import home from './src/routes/home';
import user from './src/routes/user';
import './src/database/conn';
import token from './src/routes/token';
import student from './src/routes/student';
import image from './src/routes/image';

import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', home);
    this.app.use('/', user);
    this.app.use('/', token);
    this.app.use('/', student);
    this.app.use('/', image);
  }
}

export default new App().app;
