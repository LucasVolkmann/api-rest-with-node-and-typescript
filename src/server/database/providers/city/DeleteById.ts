import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';



export const deleteById = async (id: number): Promise<void | Error> => {

  try {
    const result = await Knex(ETableNames.city)
      .del()
      .where('id', id)
      .limit(1);

    if (result > 0) return;

    return new Error('Register not found');
  } catch (error) {
    console.log(error);
    return new Error('Error while deleting a register.');
  }

};