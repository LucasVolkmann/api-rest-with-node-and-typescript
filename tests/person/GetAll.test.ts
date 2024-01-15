import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { IUser } from '../../src/server/database/models';


describe('Person - Get All', () => {

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

  it('Get All | no query query | successful case', async () => {

    const response = await testServer
      .get('/person')
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(Number(response.header['x-total-count'])).toBeGreaterThan(0);
    expect(response.body.length).toBeGreaterThan(0);

  });
  it('Get All | incorrect [page] and [limit] | incorrect query params error', async () => {

    const response = await testServer
      .get('/person?page=-1&limit=-1')
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.query');
    expect(response.body.errors.query).toHaveProperty('page');
    expect(response.body.errors.query).toHaveProperty('limit');

  });
  it('Get All | limit defined | array length equal to limit', async () => {

    const limitLength = 5;

    const response = await testServer
      .get(`/person?&limit=${limitLength}`)
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body.length).toEqual(limitLength);
    expect(response.body[0]).toHaveProperty('id');

  });

});