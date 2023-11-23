import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validator } from '../../shared/middleware';

interface ICity {
    id: number;
    name: string;
}

export const updateByIdValidator = validator((getSchema) => ({
    body: getSchema<ICity>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
        name: yup.string().required().min(3),
    })),
}));

export const updateById = async (req: Request<{}, {}, ICity>, res: Response) => {

    if(Number(req.body.id) === 999999){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({
                errors: {
                    default: 'Not Found Register.'
                }
            });
    } 
    return res.status(StatusCodes.OK).send();
};
