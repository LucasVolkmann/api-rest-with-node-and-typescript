import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validator } from '../../shared/middleware';
import { CityProvider } from '../../database/providers/city';

interface IParamProps {
  id?: number;
}
export const deleteByIdValidator = validator((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {

  const result = await CityProvider.deleteById(Number(req.params.id));

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  } else {
    return res.status(StatusCodes.NO_CONTENT).send();
  }

};
