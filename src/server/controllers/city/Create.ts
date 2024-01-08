import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validator } from '../../shared/middleware';
import { ICity } from '../../database/models';
import { CityProvider } from '../../database/providers/city';

interface IBodyProps extends Omit<ICity, 'id'> { }

export const createValidator = validator((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    name: yup.string().required().min(3).max(150),
  })),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

  const result = await CityProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
