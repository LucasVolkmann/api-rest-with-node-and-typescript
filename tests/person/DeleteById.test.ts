import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Person - Delete By Id', () => {

  it('Delete one person | correct object | successful case', async () => {

    const response = await testServer.delete('/person/1').send();

    expect(response.status).toEqual(StatusCodes.NO_CONTENT);

  });

  it('Delete one person | wrong param | param error message', async () => {

    const response = await testServer.delete('/person/a').send();

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.params.id');

  });

  it('Delete one person | unknown id | person not find message', async () => {

    const response = await testServer.delete('/person/9999999999');

    expect(response.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
    expect(response.body.errors.default.includes('person'));

  });

});