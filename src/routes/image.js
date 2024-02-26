import { Router } from 'express';
import ImageController from '../controllers/ImageController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/image', loginRequired, ImageController.store);

export default router;
