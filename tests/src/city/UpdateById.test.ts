import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../jest.setup';
import { IUser } from '../../../src/server/database/models';



describe('City - Update By Id', () => {

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

  it('Updating a register', async () => {

    const res1 = await testServer
      .post('/city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'Mock City'
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const cityToUpdate = {
      id: res1.body,
      name: 'Mock City Updated'
    };

    const res2 = await testServer
      .put('/city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        ...cityToUpdate
      });

    expect(res2.statusCode).toEqual(StatusCodes.OK);
  });
  it('Updating a non-existing register.', async () => {

    const res1 = await testServer
      .put('/city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        id: 999999,
        name: 'Mock City'
      });


    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});