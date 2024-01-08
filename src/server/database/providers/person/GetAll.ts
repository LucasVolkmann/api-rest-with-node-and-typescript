import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';



export const get = async (page: number, limit: number, filter: string): Promise<IPerson[] | Error> => {

  try {
    const result = await Knex(ETableNames.person)
      .select('*')
      .whereRaw(`CONCAT(firstName, ' ', lastName) like '%${filter}%'`)
      .offset((limit * (page - 1)))
      .limit(limit);

    if (result) {
      return result;
    } else {
      return new Error('Error while getting a person.');
    }

  } catch (error) {
    console.log(error);
    return new Error('Error while getting a person.');
  }

};