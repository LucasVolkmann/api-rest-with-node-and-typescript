import { server } from './server/Server';
import { Knex } from './server/database/knex';

const port = process.env.PORT || 3333;

const startServer = () => {
  server.listen(port, () => {
    console.log(`Server running at 'localhost:${port}'`);
  });
};

if(process.env.IS_LOCAL_HOST !== 'true'){
  Knex.migrate.latest().then(() => {
    Knex.seed.run()
      .then(startServer).catch(console.log);
  }).catch(console.log);
} else {
  startServer();
}