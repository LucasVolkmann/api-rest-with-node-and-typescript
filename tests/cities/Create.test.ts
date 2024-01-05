import { testServer } from '../jest.setup';
import { StatusCodes } from 'http-status-codes';



describe('Cities - Create', () => {

  it('Create a register.', async () => {
    const res1 = await testServer
      .post('/cities')
      .send({ name: 'Blumenau' });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(res1.body).toHaveProperty('name');
    expect(res1.body).toHaveProperty('id');
  });
  it('It try to create a register using a name with 2 characters.', async () => {
    const res1 = await testServer
      .post('/cities')
      .send({ name: 'aa' });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.name');
  });
});