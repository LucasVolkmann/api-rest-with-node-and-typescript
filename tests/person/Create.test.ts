import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { IUser } from '../../src/server/database/models';


describe('Person - Create', () => {

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

  let testCityId: number | undefined = undefined;
  beforeAll(async () => {
    const result = await testServer
      .post('/city')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        name: 'mock city (person tests)'
      });
    testCityId = result.body;
  });


  it('Create one person | correct object | successful case.', async () => {

    const response = await testServer
      .post('/person')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        first_name: 'mock',
        last_name: 'person',
        email: 'mock.person@example.com',
        id_city: testCityId,
      });

    console.log(response.body);


    expect(response.status).toEqual(StatusCodes.CREATED);
    expect(Number.isInteger(response.body));

  });
  it('Create one person | small name | badRequest.', async () => {

    const response = await testServer
      .post('/person')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        firstName: 'a',
        lastName: 'person',
        email: 'mock.person@example.com',
        idCity: testCityId,
      });

    expect(response.body).toHaveProperty('errors');
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);

  });
  it('Create one person | invalid email | badRequest.', async () => {

    const response = await testServer.
      post('/person')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        firstName: 'mock',
        lastName: 'person',
        email: 'bla bla',
        idCity: testCityId,
      });

    expect(response.body).toHaveProperty('errors');
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);

  });
  it('Create one person | unknown idCity | Cannot find this city.', async () => {

    const response = await testServer
      .post('/person')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        first_name: 'mock',
        last_name: 'person',
        email: 'mock.person@example.com',
        id_city: 9999999999,
      });

    expect(response.body).toHaveProperty('errors.default');
    expect((response.body.errors.default).includes('city'));
    expect(response.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);

  });

});