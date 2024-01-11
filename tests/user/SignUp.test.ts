import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../src/server/database/models';
import { testServer } from '../jest.setup';


describe('User - Sign Up', () => {

  it('Right sign up should return an integer id', async () => {

    const newUser: Omit<IUser, 'id'> = {
      username: 'mock user',
      email: 'mock.email@example.com',
      password: 'mock123'
    };

    const response = await testServer.post('/signup').send(newUser);

    expect(response.status).toEqual(StatusCodes.CREATED);
    expect(response.body).toBeGreaterThan(0);

  });

  it('Email already exists should return `This Email already exists.`', async () => {

    const oldUser: Omit<IUser, 'id'> = {
      username: 'mock user',
      email: 'new.mock.email@example.com',
      password: 'mock123'
    };

    const responseOldUser = await testServer.post('/signup').send(oldUser);

    expect(responseOldUser.status).toEqual(StatusCodes.CREATED);
    expect(responseOldUser.body).toBeGreaterThan(0);

    const newUser: Omit<IUser, 'id'> = {
      username: 'new mock user',
      email: 'mock.email@example.com',
      password: 'new_mock123'
    };

    const response = await testServer.post('/signup').send(newUser);

    expect(response.status).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default', 'This Email already exists.');

  });

  it('Send without username field should return username error message', async () => {

    const missingUsernameUser: Omit<IUser, 'id' | 'username'> = {
      email: 'mock.email@example.com',
      password: 'mock123'
    };

    const response = await testServer.post('/signup').send(missingUsernameUser);

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.username');

  });

  it('Send without email field should return email error message', async () => {

    const missingEmailUser: Omit<IUser, 'id' | 'email'> = {
      username: 'mock user',
      password: 'mock123'
    };

    const response = await testServer.post('/signup').send(missingEmailUser);

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.email');

  });

  it('Send without password field should return password error message', async () => {

    const missingPasswordUser: Omit<IUser, 'id' | 'password'> = {
      username: 'mock user',
      email: 'mock.email@example.com'
    };

    const response = await testServer.post('/signup').send(missingPasswordUser);

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.password');

  });

  it('Send an empty object should return the required fields error message', async () => {

    const response = await testServer.post('/signup').send({});

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.username');
    expect(response.body).toHaveProperty('errors.body.email');
    expect(response.body).toHaveProperty('errors.body.password');

  });

  it('Send an password with length smallest than 6 should return password constraints error message', async () => {

    const user: Omit<IUser, 'id'> = {
      username: 'mock user',
      email: 'mock.email@example.com',
      password: '12345'
    };

    const response = await testServer.post('/signup').send(user);

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.password');
    expect(response.body.errors.body.password.includes('6'));

  });

  it('Send an invalid email should return invalid email error message', async () => {

    const user: Omit<IUser, 'id'> = {
      username: 'mock user',
      email: 'invalid@email@example.com',
      password: '123456'
    };

    const response = await testServer.post('/signup').send(user);

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.email');
    expect(response.body.errors.body.email.includes('invalid'));

  });



});