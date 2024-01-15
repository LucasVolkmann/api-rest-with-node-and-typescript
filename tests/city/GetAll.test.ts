import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { IUser } from '../../src/server/database/models';



describe('City - Get All', () => {

  let accessToken = '';
  beforeAll(async () => {
    const newUser: Omit<IUser, 'id'> = {
      username: 'mockUser',
      email: 'mock.user@example.com',
      password: 'mock123',
    };
    await testServer.post('/signup')
      .send(newUser);
    const signInResponse = await testServer.post('/signin')
      .send({
        email: newUser.email,
        password: newUser.password
      });
    accessToken = signInResponse.body.accessToken;
    // .set({ Authorization: `Bearer ${accessToken}` })
  });

  it('Get all registers.', async () => {

    const res1 = await testServer
      .post('/city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'Mock Test City'
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const res2 = await testServer
      .get('/city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res2.statusCode).toEqual(StatusCodes.OK);
    expect(Number(res2.header['x-total-count'])).toBeGreaterThan(0);
    expect(res2.body.length).toBeGreaterThan(0);
  });
  it('It try to get all with query param [ page ] below zero.', async () => {
    const res1 = await testServer
      .get('/city?page=-1')
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.query.page');
  });
});