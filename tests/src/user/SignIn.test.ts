import { StatusCodes } from 'http-status-codes';
import { IUser } from '../../../src/server/database/models';
import { testServer } from '../../jest.setup';


describe('User - Sign In', () => {
  const user: IUser = { id: 0, username: '', email: '', password: '' };
  beforeAll(async () => {
    const newUser: Omit<IUser, 'id'> = {
      username: 'mock user',
      email: 'mock.user@example.com',
      password: 'mock123'
    };
    const responseNewUser = await testServer.post('/signup').send(newUser);
    user.id = responseNewUser.body;
    user.username = newUser.username;
    user.email = newUser.email;
    user.password = newUser.password;
  });
  it('Sign in with correct credentials -> return an access token', async () => {
    const response = await testServer.post('/signin').send({
      email: user.email,
      password: user.password
    });

    expect(response.status).toEqual(StatusCodes.OK);
    expect(response.body).toHaveProperty('accessToken');
  });
  it('Sign In with unknown email should return `Wrong credentials.`', async () => {
    const response = await testServer.post('/signin').send({
      email: '__unknown_mock_email' + user.email,
      password: user.password
    });

    expect(response.status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body).toHaveProperty('errors.default', 'Wrong credentials.');
  });
  it('Sign In with wrong password should return `Wrong credentials.`', async () => {
    const response = await testServer.post('/signin').send({
      email: user.email,
      password: '__wrong_mock_password' + user.password
    });

    expect(response.status).toEqual(StatusCodes.UNAUTHORIZED);
    expect(response.body).toHaveProperty('errors.default', 'Wrong credentials.');
  });
  it('Send an invalid email should return email invalid error. STATUS: Bad Request.', async () => {
    const response = await testServer.post('/signin').send({
      email: 'mock.email@@example.com',
      password: '__wrong_mock_password'
    });

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.email');
  });
  it('Send an empty password field should return password invalid error. STATUS: Bad Request', async () => {
    const response = await testServer.post('/signin').send({
      email: user.email,
      password: ''
    });

    expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty('errors.body.password');
  });
});