import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';
import { validator } from '../../shared/middleware';

import { ICity } from '../../database/models';
import { CityProvider } from '../../database/providers/city';

interface IBodyProps extends ICity { }

export const updateByIdValidator = validator((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
    name: yup.string().required().min(3),
  })),
}));

export const updateById = async (req: Request<{}, {}, IBodyProps>, res: Response) => {

  const result = await CityProvider.updateById(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        errors: {
          default: result.message
        }
      });
  } else {
    return res.status(StatusCodes.OK).json(result);
  }

};
