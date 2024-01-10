import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';


export const getByEmail = async (email: string): Promise<IUser | Error> => {

  try {
    const [result] = await Knex(ETableNames.user)
      .select('*').where('email', email);

    return result;

  } catch (error) {
    console.log(error);
    return new Error('Error while getting a user.');
  }

};