import * as yup from 'yup';
import { validator } from '../../shared/middleware';

import { Request, Response } from 'express';
import { UserProvider } from '../../database/providers/user';
import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../database/models';


interface IBodyProps extends Omit<IUser, 'id' | 'username'> {
  email: string,
  password: string
}

export const signInValidator = validator((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email().max(150),
    password: yup.string().required().max(150)
  }))
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const { email: reqEmail, password: reqPassword } = req.body;

  const result = await UserProvider.getByEmail(reqEmail);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  } else if (result && result.password === reqPassword) {
    return res.status(StatusCodes.OK).json({ accessToken: 'mock.access.token' });
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Wrong credentials.'
      }
    });
  }

};