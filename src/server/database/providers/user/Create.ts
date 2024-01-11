import { UserProvider } from '.';
import { PasswordCrypto } from '../../../shared/services';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';


export const create = async (user: Omit<IUser, 'id'>): Promise<number | Error> => {

  try {

    const countEmail = await UserProvider.getByEmail(user.email);
    
    if (countEmail) {
      return new Error('This Email already exists.');
    }
    
    user.password = await PasswordCrypto.hashPassword(user.password);
    const [result] = await Knex(ETableNames.user).insert(user).returning('id');

    if (result.id > 0) {
      return result.id;
    } else {
      return new Error('Error while trying to create user.');
    }

  } catch (error) {
    console.log(error);
    return new Error('Error while trying to create user.');
  }

};