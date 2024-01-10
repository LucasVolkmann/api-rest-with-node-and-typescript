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
    firstName: 'Lucas',
    lastName: 'Eduardo Volkmann',
    email: 'lucas.volkmann@example.com',
    idCity: 2
  },
  {
    firstName: 'German',
    lastName: 'Cano',
    email: 'german.cano@example.com',
    idCity: 4
  },
  {
    firstName: 'Lucas',
    lastName: 'Pereira',
    email: 'lucas.pereira3@proton.com',
    idCity: 6
  },
  {
    firstName: 'Giovanna',
    lastName: 'Lima',
    email: 'giovanna.lima4@yahoo.com',
    idCity: 8
  },
  {
    firstName: 'Mateus',
    lastName: 'Santos',
    email: 'mateus.santos5@yahoo.com',
    idCity: 10
  },
  {
    firstName: 'Laura',
    lastName: 'Silva',
    email: 'laura.silva6@terra.com',
    idCity: 12
  },
  {
    firstName: 'Gabriel',
    lastName: 'Lima',
    email: 'gabriel.lima7@icloud.com',
    idCity: 14
  },
  {
    firstName: 'Beatriz',
    lastName: 'Lima',
    email: 'beatriz.lima8@outlook.com',
    idCity: 16
  },
  {
    firstName: 'Pedro',
    lastName: 'Rodrigues',
    email: 'pedro.rodrigues9@proton.com',
    idCity: 18
  },
  {
    firstName: 'Sofia',
    lastName: 'Araujo',
    email: 'sofia.araujo10@yahoo.com',
    idCity: 20
  }
];
