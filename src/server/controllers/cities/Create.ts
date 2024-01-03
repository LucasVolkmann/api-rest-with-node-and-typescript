import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validator } from '../../shared/middleware';
import { Knex } from '../../database/knex';

interface ICity {
    name: string;
}

export const createValidator = validator((getSchema) => ({
    body: getSchema<ICity>(yup.object().shape({
        name: yup.string().required().min(3),
    })),
}));

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {

    Knex('city');


    return res.status(StatusCodes.CREATED)
        .json({ 
            id: 1,
            name: req.body.name,
        });
};
