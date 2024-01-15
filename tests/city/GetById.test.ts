import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { IUser } from '../../src/server/database/models';



describe('City - Get By Id', () => {

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

  it('Get a register by id.', async () => {
  
    const res2 = await testServer
      .get('/city/1')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res2.statusCode).toEqual(StatusCodes.OK);
    expect(res2.body).toHaveProperty('name');

  });
  it('Getting by id a non-existing register.', async () => {
    const res1 = await testServer
      .get('/city/999999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});