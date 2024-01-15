import supertest from 'supertest';

import { server } from './../src/server/Server';
import { Knex } from '../src/server/database/knex';

import { IUser } from '../src/server/database/models';
import { StatusCodes } from 'http-status-codes';

const testServer = supertest.agent(server);

beforeAll(async () => {
  await Knex.migrate.latest();
  await Knex.seed.run();
  await getTestToken();
});

afterAll(async () => {
  await Knex.destroy();
});

const getTestToken = async () => {

  const newUser: Omit<IUser, 'id'> = {
    username: 'mock user',
    email: 'mock.user@example.com',
    password: 'mock123',
  };
  const res1 = await testServer.post('/signup')
    .send(newUser);

  if (res1.body > 0) {
    const res2 = await testServer.post('/signin')
      .send({
        email: newUser.email,
        password: newUser.password
      });
    if (res2.status === StatusCodes.OK) {
      testServer.auth(res2.body.accessToken, { type: 'bearer' });
      return;
    }
  }
  throw new Error('Error while authenticating tests.');
};



export { testServer };