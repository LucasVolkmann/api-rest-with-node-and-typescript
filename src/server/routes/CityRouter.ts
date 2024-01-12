import { Router } from 'express';
import { CityController } from '../controllers';
import { ensureAuthenticated } from '../shared/middleware';

const cityRouter = Router();

const beforeAll = [
  ensureAuthenticated
];

cityRouter.get('/city',
  beforeAll,
  CityController.getAllValidator,
  CityController.getAll
);

cityRouter.get('/city/:id',
  beforeAll,
  CityController.getByIdValidator,
  CityController.getById
);

cityRouter.post('/city',
  beforeAll,
  CityController.createValidator,
  CityController.create
);

cityRouter.put('/city',
  beforeAll,
  CityController.updateByIdValidator,
  CityController.updateById
);

cityRouter.delete('/city/:id',
  beforeAll,
  CityController.deleteByIdValidator,
  CityController.deleteById
);

export { cityRouter };
