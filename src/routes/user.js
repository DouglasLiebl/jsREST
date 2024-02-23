import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = new Router();

router.post('/user', UserController.create);
router.get('/user', UserController.index);
router.get('/user/:id', UserController.show);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.delete);

export default router;
