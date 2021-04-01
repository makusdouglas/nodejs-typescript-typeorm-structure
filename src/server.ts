import server from './app';
const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST || '0.0.0.0';
server.listen(PORT, HOST, 0).once('listening', () => {
  console.log('NODE SERVER STARTED IN');
});
