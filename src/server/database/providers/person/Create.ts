import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';


export const create = async (person: Omit<IPerson, 'id'>): Promise<number | Error> => {

  try {

    const validateIdCity = await Knex(ETableNames.city)
      .select('*').where('id', person.id_city);

    if(validateIdCity.length <= 0) {
      return new Error('No one city founded with this id.');
    }

    const [result] = await Knex(ETableNames.person).insert(person).returning('id');

    if (result.id > 0) {
      return result.id;
    } else {
      return new Error('Error while trying to create person.');
    }

  } catch (error) {
    console.log(error);
    return new Error('Error while trying to create person.');
  }

};