import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICity } from '../../models';



export const getById = async (id: number): Promise<ICity | Error> => {

  try {
    const result = await Knex(ETableNames.city)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('No one register find.');

  } catch (error) {
    console.log(error);
    return new Error('Error while finding by id.');
  }
};