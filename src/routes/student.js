import { Router } from 'express';
import StudentController from '../controllers/StudentController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/student', StudentController.index);
router.post('/student', loginRequired, StudentController.create);
router.put('/student/:id', loginRequired, StudentController.update);
router.get('/student/:id', StudentController.show);
router.delete('/student/:id', loginRequired, StudentController.delete);

export default router;
