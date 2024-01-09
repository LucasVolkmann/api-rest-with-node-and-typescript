import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';
import { IPerson } from '../../src/server/database/models';


describe('Person - Update By Id', () => {

  let testCityId: number;
  beforeAll(async () => {
    const result = await testServer.post('/city').send({
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

    const response = await testServer.put('/person').send({ ...personToUpdate });

    expect(response.status).toEqual(StatusCodes.NO_CONTENT);

    const response2 = await testServer.get(`/person/${personToUpdate.id}`).send();

    expect(response2.status).toEqual(StatusCodes.OK);
    expect(response2.body).toMatchObject(personToUpdate);

  });

  it('Update one person | wrong email | email error', async () => {

    const response = await testServer.put('/person').send({
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

    const response = await testServer.put('/person').send({
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