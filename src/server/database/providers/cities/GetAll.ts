import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICity } from '../../models';



export const getAll = async (page: number, limit:number, filter:string, id = 0): Promise<ICity[] | Error> => {

    try {
        const result = await Knex(ETableNames.city)
            .select('*')
            .where('id', Number(id))
            .orWhere('name', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);

        if(id > 0 && result.every(reg => reg.id !== id)){
            const resultById = await Knex(ETableNames.city)
                .select('*')
                .where('id', Number(id))
                .first();

            if(resultById) return [ ...result, resultById ];
        }
        
        if(result){
            return result;
        } else {
            return new Error('No one register founded.');
        }
        
    } catch (error) {
        console.log(error);
        return new Error('Error while finding all.');
    }

};