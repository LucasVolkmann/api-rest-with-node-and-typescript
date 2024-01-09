import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Person - Create', () => {

  let testCityId: number | undefined = undefined;
  beforeAll(async () => {
    const result = await testServer.post('/city').send({
      name: 'mock city (person tests)'
    });
    testCityId = result.body;
  });

  it('Create one person | correct object | successful case.', async () => {

    const response = await testServer.post('/person').send({
      firstName: 'mock',
      lastName: 'person',
      email: 'mock.person@example.com',
      idCity: testCityId,
    });

    console.log(response.body);
    

    expect(response.status).toEqual(StatusCodes.CREATED);
    expect(Number.isInteger(response.body));

  });

  it('Create one person | small name | badRequest.', async () => {

    const response = await testServer.post('/person').send({
      firstName: 'a',
      lastName: 'person',
      email: 'mock.person@example.com',
      idCity: testCityId,
    });

    expect(response.body).toHaveProperty('errors');
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);

  });

  it('Create one person | invalid email | badRequest.', async () => {

    const response = await testServer.post('/person').send({
      firstName: 'mock',
      lastName: 'person',
      email: 'bla bla',
      idCity: testCityId,
    });

    expect(response.body).toHaveProperty('errors');
    expect(response.status).toBe(StatusCodes.BAD_REQUEST);

  });

  it('Create one person | unknown idCity | Cannot find this city.', async () => {

    const response = await testServer.post('/person').send({
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