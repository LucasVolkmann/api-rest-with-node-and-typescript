import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IPerson } from '../../models';


export const updateById = async (person: IPerson): Promise<void | Error> => {

  try {

    const validateIdCity = await Knex(ETableNames.city)
      .where('id', person.idCity).count<[{ count: number }]>('* as count');

    if(validateIdCity) {
      return new Error('No one city founded with this id.');
    }

    const result = await Knex(ETableNames.person)
      .update(person).where('id', person.id).limit(1);

    if (result > 0) return;

    return new Error('Error while updating by id.');
  } catch (error) {
    console.log(error);
    return new Error('Error while updating by id.');
  }

};