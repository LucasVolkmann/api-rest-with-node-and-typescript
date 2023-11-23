import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';



describe('Cities - Delete By Id', () => {

    it('Deleting a register', async () => {

        const res1 = await testServer
            .post('/cities')
            .send({ name: 'Mock Test City' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer
            .delete(`/cities/${res1.body.id}`)
            .send();

        expect(res2.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Deleting a non-existing register.', async () => {
        const res1 = await testServer
            .delete('/cities/999999');

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});