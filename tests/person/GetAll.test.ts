import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Person - Get All', () => {

  it('Get All | no query query | successful case', async () => {

    const response = await testServer.get('/person');

    expect(response.statusCode).toEqual(StatusCodes.OK);
    expect(Number(response.header['x-total-count'])).toBeGreaterThan(0);
    expect(response.body.length).toBeGreaterThan(0);

  });

  it('Get All | incorrect [page] and [limit] | incorrect query params error', async () => {

    const response = await testServer.get('/person?page=-1&limit=-1');

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.query');
    expect(response.body.errors.query).toHaveProperty('page');
    expect(response.body.errors.query).toHaveProperty('limit');

  });

  it('Get All | limit defined | array length equal to limit', async () => {

    const limitLength = 5;

    const response = await testServer.get(`/person?&limit=${limitLength}`);

    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body.length).toEqual(limitLength);
    expect(response.body[0]).toHaveProperty('id');

  });

});