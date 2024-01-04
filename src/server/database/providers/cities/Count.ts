import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';



export const count = async (filter:string): Promise<number | Error> => {
    
    try {
        const [{ count }] = await Knex(ETableNames.city)
            .count<[{ count : number }]>('* as count')
            .where('name', 'like', `%${filter}%`);

        if (count == 0) {
            return new Error('No one register founded with this filter.');
        } else if(Number.isInteger(Number(count))){
            return Number(count);
        }

        return new Error('Error while counting with filter');

    } catch (error) {
        console.error(error);
        return new Error('Error while count with filter.');
    }

};