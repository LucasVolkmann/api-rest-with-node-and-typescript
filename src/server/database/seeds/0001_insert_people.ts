import { ETableNames } from '../ETableNames';
import { Knex } from 'knex';



export const seed = async (knex: Knex) => {
  
  const TABLE = ETableNames.person;

  const [{ count }] = await knex(TABLE).count<[{ count: number }]>('* as count');

  if(count > 0) return;

  console.log(`# Populating table '${TABLE}'`);
  
  await knex(TABLE).insert(people);

};

const people = [
  {
    first_name: 'Lucas',
    last_name: 'Eduardo Volkmann',
    email: 'lucas.volkmann@example.com',
    id_city: 2
  },
  {
    first_name: 'German',
    last_name: 'Cano',
    email: 'german.cano@example.com',
    id_city: 4
  },
  {
    first_name: 'Lucas',
    last_name: 'Pereira',
    email: 'lucas.pereira3@proton.com',
    id_city: 6
  },
  {
    first_name: 'Giovanna',
    last_name: 'Lima',
    email: 'giovanna.lima4@yahoo.com',
    id_city: 8
  },
  {
    first_name: 'Mateus',
    last_name: 'Santos',
    email: 'mateus.santos5@yahoo.com',
    id_city: 10
  },
  {
    first_name: 'Laura',
    last_name: 'Silva',
    email: 'laura.silva6@terra.com',
    id_city: 12
  },
  {
    first_name: 'Gabriel',
    last_name: 'Lima',
    email: 'gabriel.lima7@icloud.com',
    id_city: 14
  },
  {
    first_name: 'Beatriz',
    last_name: 'Lima',
    email: 'beatriz.lima8@outlook.com',
    id_city: 16
  },
  {
    first_name: 'Pedro',
    last_name: 'Rodrigues',
    email: 'pedro.rodrigues9@proton.com',
    id_city: 18
  },
  {
    first_name: 'Sofia',
    last_name: 'Araujo',
    email: 'sofia.araujo10@yahoo.com',
    id_city: 20
  }
];
