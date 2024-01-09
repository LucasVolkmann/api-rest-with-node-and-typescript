import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.person, table => {
      table.bigIncrements('id').primary().index();
      table.string('firstName').index().notNullable();
      table.string('lastName').index().notNullable();
      table.string('email').unique().notNullable();

      table.bigInteger('idCity').notNullable().index()
        .references('id')
        .inTable(ETableNames.city)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Person table');
    })
    .then(() => {
      console.log(`# Table '${ETableNames.person}' has been created.`);
    });
}


export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.person)
    .then(() => {
      console.log(`# Table '${ETableNames.person}' has been deleted.`);
    });
}

