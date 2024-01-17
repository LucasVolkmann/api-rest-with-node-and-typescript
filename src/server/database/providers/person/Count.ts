import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const count = async (filter = ''): Promise<number | Error> => {

  try {

    const [{ count }] = await Knex(ETableNames.person)
      .count<[{ count: number }]>('* as count')
      .whereRaw(`CONCAT(first_name, ' ', last_name) like '%${filter}%'`);

    if (count >= 0) return count;

    return new Error(`Error while counting with filter='${filter}'`);

  } catch (error) {
    console.log(error);
    return new Error(`Error while counting with filter='${filter}'`);
  }

};