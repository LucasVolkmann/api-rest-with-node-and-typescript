import * as yup from 'yup';
import { IUser } from '../../database/models';
import { validator } from '../../shared/middleware';

import { Request, Response } from 'express';
import { UserProvider } from '../../database/providers/user';
import { StatusCodes } from 'http-status-codes';



interface IBodyProps extends Omit<IUser, 'id'> { }

export const signUpValidator = validator((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    username: yup.string().required().min(3),
    email: yup.string().email().min(5).required(),
    password: yup.string().required().min(6)
  }))
}));

export const signUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

  const result = await UserProvider.create(req.body);

  if(result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  } else {
    return res.status(StatusCodes.CREATED).json(result);
  }

};