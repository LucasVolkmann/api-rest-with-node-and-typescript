import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { IUser } from '../../src/server/database/models';


describe('Person - Get By Id', () => {

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

  it('Get By Id | successful case', async () => {

    const response = await testServer
      .get('/person/1')
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('first_name');
    expect(response.body).toHaveProperty('last_name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('id_city');

  });
  it('Get By Id | invalid id | incorrect param error', async () => {

    const response = await testServer
      .get('/person/a')
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.params.id');
    expect(response.body.errors.params.id.includes('id'));

  });
  it('Get By Id | unknown id | register not found', async () => {

    const response = await testServer
      .get('/person/9999999999')
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
    expect(response.body.errors.default.includes('register'));

  });
  
});