import { Router } from 'express';
import { PersonController } from '../controllers';

const personRouter = Router();

personRouter.get('/person', 
  PersonController.getAllValidator, 
  PersonController.getAll
);

personRouter.get('/person/:id', 
  PersonController.getByIdValidator, 
  PersonController.getById
);

personRouter.post('/person', 
  PersonController.createValidator, 
  PersonController.create
);

personRouter.put('/person', 
  PersonController.updateValidator, 
  PersonController.updateById
);

personRouter.delete('/person/:id', 
  PersonController.deleteByIdValidator, 
  PersonController.deleteById
);

export { personRouter };
