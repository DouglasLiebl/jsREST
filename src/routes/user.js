import { Router } from 'express';
import UserController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/user', UserController.create);
router.get('/user', loginRequired, UserController.index);

router.get('/user/:id', UserController.show);
router.put('/user/:id', loginRequired, UserController.update);
router.delete('/user/:id', UserController.delete);

export default router;
