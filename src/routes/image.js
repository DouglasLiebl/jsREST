import { Router } from 'express';
import ImageController from '../controllers/ImageController';

const router = new Router();

router.post('/image', ImageController.store);

export default router;
