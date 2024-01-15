import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { IPerson, IUser } from '../../src/server/database/models';


describe('Person - Update By Id', () => {

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

  let testCityId: number;
  beforeAll(async () => {
    const result = await testServer
      .post('/city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'mock city (person tests)'
      });
    testCityId = result.body;
  });

  it('Update one person | correct object | successful case', async () => {

    const personToUpdate: IPerson = {
      id: 1,
      firstName: 'mock person',
      lastName: 'updated',
      email: 'mock.person@example.com',
      idCity: testCityId
    };

    const response = await testServer
      .put('/person')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ ...personToUpdate });

    expect(response.status).toEqual(StatusCodes.NO_CONTENT);

    const response2 = await testServer
      .get(`/person/${personToUpdate.id}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(response2.status).toEqual(StatusCodes.OK);
    expect(response2.body).toMatchObject(personToUpdate);

  });
  it('Update one person | wrong email | email error', async () => {

    const response = await testServer
      .put('/person')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        id: 1,
        firstName: 'mock person',
        lastName: 'updated',
        email: 'this is an wrong email',
        idCity: testCityId
      });

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.email');

  });
  it('Update one person | unknown city | city not founded', async () => {

    const response = await testServer
      .put('/person')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        id: 1,
        firstName: 'mock',
        lastName: 'person',
        email: 'mock.person@example.com',
        idCity: 9999999999,
      });

    expect(response.body).toHaveProperty('errors.default');
    expect((response.body.errors.default).includes('city'));
    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);

  });

});