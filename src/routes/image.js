import { Router } from 'express';
import multer from 'multer';
import ImageController from '../controllers/ImageController';

import multerConfig from '../config/multer';

const upload = multer(multerConfig);

const router = new Router();

router.post('/image', upload.single('image'), ImageController.store);

export default router;
