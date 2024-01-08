import { Router } from 'express';
import { CityController } from '../controllers';

const cityRouter = Router();

cityRouter.get('/city',
  CityController.getAllValidator,
  CityController.getAll
);

cityRouter.get('/city/:id',
  CityController.getByIdValidator,
  CityController.getById
);

cityRouter.post('/city',
  CityController.createValidator,
  CityController.create
);

cityRouter.put('/city',
  CityController.updateByIdValidator,
  CityController.updateById
);

cityRouter.delete('/city/:id',
  CityController.deleteByIdValidator,
  CityController.deleteById
);

export { cityRouter };
