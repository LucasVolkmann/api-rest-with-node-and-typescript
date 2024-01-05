import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.city, table => {
      table.bigIncrements('id').primary().index();
      table.string('name', 150).checkLength('<=', 150).index().notNullable();

      table.comment('City table');
    })
    .then(() => {
      console.log(`# Table '${ETableNames.city}' has been created.`);
    });
}


export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.city)
    .then(() => {
      console.log(`# Table '${ETableNames.city}' has been deleted.`);
    });
}

