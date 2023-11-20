import express from 'express';

const server = express();

server.get('/', (_,res) => {
    return res.send('Fluminense Football Club!');
});


export { server };