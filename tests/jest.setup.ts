import supertest from 'supertest';

import { server } from './../src/server/Server';
import { Knex } from '../src/server/database/knex';


const testServer = supertest.agent(server);

beforeAll(async () => {
  await Knex.migrate.latest();
  await Knex.seed.run();
});

afterAll(async () => {
  await Knex.destroy();
});


export { testServer };