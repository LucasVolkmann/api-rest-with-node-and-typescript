import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { IUser } from '../../src/server/database/models';



describe('City - Delete By Id', () => {

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

  it('Deleting a register', async () => {

    const res1 = await testServer
      .post('/city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ name: 'Mock Test City' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const res2 = await testServer
      .delete(`/city/${res1.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res2.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Deleting a non-existing register.', async () => {
    const res1 = await testServer
      .delete('/city/999999')
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});