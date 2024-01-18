import express from 'express';
import cors from 'cors';

import 'dotenv/config';
// import './shared/services/YupTranslations';

import { cityRouter, personRouter, userRouter } from './routes';

const server = express();

server.use(express.json());
server.use(cors({
  origin: process.env.ENABLED_ORIGINS?.split(';') || []
}));

server.get('/', (_, res) => {
  return res.send('Server ON!');
});

server.use(cityRouter);
server.use(personRouter);
server.use(userRouter);


export { server };