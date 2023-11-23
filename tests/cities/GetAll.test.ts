import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';



describe('Cities - Get All', () => {
    
    it('Get all registers.', async () => {
        
        const res1 = await testServer
            .post('/cities')
            .send({
                name: 'Mock Test City'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer
            .get('/cities').send();

        expect(res2.statusCode).toEqual(StatusCodes.OK);
        expect(Number(res2.header['x-total-count'])).toBeGreaterThan(0);
        expect(res2.body.length).toBeGreaterThan(0);
    });
    it('It try to get all with query param [ page ] below zero.', async () => {
        const res1 = await testServer
            .get('/cities?page=-1');

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.query.page');
    });
});