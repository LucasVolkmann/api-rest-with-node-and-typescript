import { Router } from 'express';
import { PersonController } from '../controllers';
import { ensureAuthenticated } from '../shared/middleware';

const personRouter = Router();

const beforeAll = [
  ensureAuthenticated
];

personRouter.get('/person', 
  beforeAll,
  PersonController.getAllValidator, 
  PersonController.getAll
);

personRouter.get('/person/:id', 
  beforeAll,
  PersonController.getByIdValidator, 
  PersonController.getById
);

personRouter.post('/person', 
  beforeAll,
  PersonController.createValidator, 
  PersonController.create
);

personRouter.put('/person', 
  beforeAll,
  PersonController.updateValidator, 
  PersonController.updateById
);

personRouter.delete('/person/:id', 
  beforeAll,
  PersonController.deleteByIdValidator, 
  PersonController.deleteById
);

export { personRouter };
