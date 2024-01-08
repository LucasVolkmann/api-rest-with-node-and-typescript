import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PersonProvider } from '../../database/providers/person';

import * as yup from 'yup';
import { validator } from '../../shared/middleware';

interface IQueryProps {
  page?: number,
  limit?: number,
  filter?: string,
}

export const getAllValidator = validator((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().integer().optional().moreThan(0),
    limit: yup.number().integer().optional().moreThan(0),
    filter: yup.string().optional(),
  })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

  const count = await PersonProvider.count(req.query.filter || '');

  const result = await PersonProvider.get(
    req.query.page || 1,
    req.query.limit || 10,
    req.query.filter || ''
  );
  
  if (count instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message }
    }); 
  } else if (result instanceof Error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  } else {
    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', Number(count));
  
    return res.status(StatusCodes.OK).json(result);
  }

};