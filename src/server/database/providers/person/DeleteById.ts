import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const deleteById = async (id: number): Promise<void | Error> => {

  try {
    const result = await Knex(ETableNames.person)
      .where('id', id).del().limit(1);

    if (result > 0) return;

    return new Error('Error while deleting person.');
  } catch (error) {
    console.log(error);
    return new Error('Error while deleting person.');
  }

};