import { Request, Response } from 'express';

import * as yup from 'yup';
import { validator } from '../../shared/middleware';
import { PersonProvider } from '../../database/providers/person';
import { StatusCodes } from 'http-status-codes';

interface IParamProps {
  id?: number;
}
export const deleteByIdValidator = validator((getSchema) => ({
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
  })),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {

  const result = await PersonProvider.deleteById(Number(req.params.id));

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  } else {
    return res.status(StatusCodes.NO_CONTENT).send();
  }

};