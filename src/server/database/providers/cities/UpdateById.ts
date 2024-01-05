import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICity } from '../../models';


export const updateById = async (city: ICity): Promise<void | Error> => {

  try {
    const result = await Knex(ETableNames.city)
      .update(city)
      .where('id', '=', city.id)
      .limit(1);

    if (result > 0) return;

    return new Error('No one register founded.');

  } catch (error) {
    console.log(error);
    return new Error('Error while updating a register.');
  }

};