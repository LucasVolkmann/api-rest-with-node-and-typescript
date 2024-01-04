import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICity } from '../../models';


export const create = async (city: Omit<ICity, 'id'>): Promise<ICity | Error> => {

    try {
        const [ result ] = await Knex(ETableNames.city).insert(city).returning('*');
        
        if (typeof result === 'object' || typeof result === 'number') {
            return result;
        } else {
            return new Error('Error while create the register.');
        }

    } catch (error) {
        console.log(error);
        return new Error('Error while create the register.');
    }

};