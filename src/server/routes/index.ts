import { Router } from 'express';
import { CitiesController } from './../controllers';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Server ON!');
});

router.get('/cities', 
    CitiesController.getAllValidator, 
    CitiesController.getAll
);

router.get('/cities/:id', 
    CitiesController.getByIdValidator, 
    CitiesController.getById
);

router.post('/cities', 
    CitiesController.createValidator, 
    CitiesController.create
);

router.put('/cities', 
    CitiesController.updateByIdValidator, 
    CitiesController.updateById
);

router.delete('/cities/:id', 
    CitiesController.deleteByIdValidator, 
    CitiesController.deleteById
);

export { router };
