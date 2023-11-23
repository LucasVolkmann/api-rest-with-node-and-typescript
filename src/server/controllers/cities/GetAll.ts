import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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
    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', 1);

    const mockCities = [
        { 
            id: 1,
            name: 'Mock City 1'
        },
        { 
            id: 2,
            name: 'Mock City 2'
        },
        { 
            id: 3,
            name: 'Mock City 3'
        }
    ];

    return res.status(StatusCodes.OK).json(mockCities);
};
