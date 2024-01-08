import { Request, Response } from 'express';

import * as yup from 'yup';
import { IPerson } from '../../database/models';
import { validator } from '../../shared/middleware';
import { PersonProvider } from '../../database/providers/person';
import { StatusCodes } from 'http-status-codes';

interface IBodyProps extends IPerson { }

export const updateValidator = validator((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0),
    firstName: yup.string().required().min(2).max(150),
    lastName: yup.string().required().min(2).max(150),
    email: yup.string().email().required(),
    idCity: yup.number().integer().required().moreThan(0)
  }))
}));

export const updateById = async (req:Request<{}, {}, IBodyProps>, res:Response) => {
  
  const result = await PersonProvider.updateById(req.body);

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