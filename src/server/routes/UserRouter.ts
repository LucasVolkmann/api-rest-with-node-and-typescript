import { Router } from 'express';
import { UserController } from '../controllers/user';


const userRouter = Router();

userRouter.post('/signup', 
  UserController.signUpValidator,  
  UserController.signUp
);

userRouter.post('/signin', 
  UserController.signInValidator,  
  UserController.signIn
);

export { userRouter };