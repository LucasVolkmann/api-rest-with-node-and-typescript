import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';



describe('City - Update By Id', () => {

  it('Updating a register', async () => {

    const res1 = await testServer
      .post('/city')
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
      .send({
        ...cityToUpdate
      });

    expect(res2.statusCode).toEqual(StatusCodes.OK);
  });

  it('Updating a non-existing register.', async () => {

    const res1 = await testServer
      .put('/city').send({
        id: 999999,
        name: 'Mock City'
      });


    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});