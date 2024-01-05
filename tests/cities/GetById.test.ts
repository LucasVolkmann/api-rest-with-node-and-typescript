import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';



describe('Cities - Get By Id', () => {

  it('Get a register by id.', async () => {
    const res1 = await testServer
      .post('/cities')
      .send({
        name: 'Mock City'
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const res2 = await testServer
      .get(`/cities/${res1.body.id}`).send();

    expect(res2.statusCode).toEqual(StatusCodes.OK);
    expect(res2.body).toHaveProperty('name');

  });

  it('Getting by id a non-existing register.', async () => {
    const res1 = await testServer
      .get('/cities/999999').send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});