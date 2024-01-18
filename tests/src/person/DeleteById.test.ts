import { StatusCodes } from 'http-status-codes';
import { testServer } from '../../jest.setup';
import { IUser } from '../../../src/server/database/models';


describe('Person - Delete By Id', () => {

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

  it('Delete one person | correct object | successful case', async () => {

    const response = await testServer
      .delete('/person/1')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(response.status).toEqual(StatusCodes.NO_CONTENT);

  });
  it('Delete one person | wrong param | param error message', async () => {

    const response = await testServer
      .delete('/person/a')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.params.id');

  });
  it('Delete one person | unknown id | person not find message', async () => {

    const response = await testServer
      .delete('/person/9999999999')
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(response.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
    expect(response.body.errors.default.includes('person'));

  });

});