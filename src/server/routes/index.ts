import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Fluminense Football Club!');
});

router.post('/test', (req, res) => {
    
    return res.status(StatusCodes.CREATED).send(req.body);
});

export { router };
