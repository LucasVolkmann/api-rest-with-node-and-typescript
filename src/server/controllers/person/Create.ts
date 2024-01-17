import { Request, Response } from 'express';
import { PersonProvider } from '../../database/providers/person';
import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';
import { IPerson } from '../../database/models';
import { validator } from '../../shared/middleware';

interface IBodyProps extends Omit<IPerson, 'id'> { }

export const createValidator = validator((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    first_name: yup.string().required().min(2).max(150),
    last_name: yup.string().required().min(2).max(150),
    email: yup.string().email().required(),
    id_city: yup.number().integer().required().moreThan(0)
  }))
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

  const result = await PersonProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};