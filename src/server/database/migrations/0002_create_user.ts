import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.user, table => {
      table.bigIncrements('id').primary().index();
      table.string('username').index().notNullable().checkLength('>', 3);
      table.string('email').index().unique().notNullable().checkLength('>=', 5);
      table.string('password').notNullable().checkLength('>', 6);

      table.comment('User table');
    })
    .then(() => {
      console.log(`# Table '${ETableNames.user}' has been created.`);
    });
}


export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.user)
    .then(() => {
      console.log(`# Table '${ETableNames.user}' has been deleted.`);
    });
}

