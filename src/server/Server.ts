import express from 'express';

import 'dotenv/config';
// import './shared/services/YupTranslations';

import { cityRouter, personRouter } from './routes';

const server = express();

server.use(express.json());

server.get('/', (_, res) => {
  return res.send('Server ON!');
});

server.use(cityRouter);
server.use(personRouter);


export { server };