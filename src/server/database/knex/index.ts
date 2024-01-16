import { knex } from 'knex';
import 'dotenv/config';
import pg from 'pg';

import { development, developmentDockerPostgres, production, test } from './Environment';

if(process.env.NODE_ENV === 'dev_doc_pg' || process.env.NODE_ENV === 'production'){
  pg.types.setTypeParser(pg.types.builtins.INT8, 'text', parseInt);
}

const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    case 'production': return production;
    case 'test': return test;
    case 'dev_doc_pg': return developmentDockerPostgres;

    default: return development;
  }
};



export const Knex = knex(getEnvironment());