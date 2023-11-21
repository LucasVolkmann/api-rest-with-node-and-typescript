import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';


interface ICity {
    name: string;
    state: string;
}

const bodyValidation: yup.Schema<ICity> = yup.object().shape({
    name: yup.string().required().min(3),
    state: yup.string().required().min(3),
});

export const createBodyValidator: RequestHandler = async (req, res, next) => {
    try {
        await bodyValidation.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const yupError = error as yup.ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach((err) => { 
            if(!err.path) return;
            errors[err.path] = err.message;
        });

        return res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }
};

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {

    console.log(req.body);

    return res.status(StatusCodes.CREATED).send('Created!');
};
