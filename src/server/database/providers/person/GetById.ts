import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';



export const getById = async (id: number): Promise<IPerson | Error> => {

  try {
    const [result] = await Knex(ETableNames.person)
      .select('*').where('id', id);

    if (result) return result;

    return new Error('Error while getting a person.');
  } catch (error) {
    console.log(error);
    return new Error('Error while getting a person.');
  }

};