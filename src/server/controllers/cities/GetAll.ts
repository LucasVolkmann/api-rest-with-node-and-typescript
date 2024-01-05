import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validator } from '../../shared/middleware';
import { CitiesProvider } from '../../database/providers/cities';

interface IQueryProps {
  page?: number,
  limit?: number,
  filter?: string,
  id?: number,
}

export const getAllValidator = validator((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().integer().optional().moreThan(0),
    limit: yup.number().integer().optional().moreThan(0),
    filter: yup.string().optional(),
    id: yup.number().integer().optional().default(0),
  })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {

  const count = await CitiesProvider.count(req.query.filter || '');
  const result = await CitiesProvider.getAll(req.query.page || 1, req.query.limit || 5, req.query.filter || '', req.query.id || 0);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message }
    });
  } else if (count instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: count.message }
    });
  }

  res.setHeader('access-control-expose-headers', 'x-total-count');
  res.setHeader('x-total-count', Number(count));

  return res.status(StatusCodes.OK).json(result);
};
