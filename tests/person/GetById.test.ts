import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Person - Get By Id', () => {

  it('Get By Id | successful case', async () => {

    const response = await testServer.get('/person/1');

    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('firstName');
    expect(response.body).toHaveProperty('lastName');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('idCity');

  });

  it('Get By Id | invalid id | incorrect param error', async () => {

    const response = await testServer.get('/person/a');

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.params.id');
    expect(response.body.errors.params.id.includes('id'));

  });

  it('Get By Id | unknown id | register not found', async () => {

    const response = await testServer.get('/person/9999999999');

    expect(response.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
    expect(response.body.errors.default.includes('register'));

  });
  
});