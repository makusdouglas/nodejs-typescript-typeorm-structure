import server from './app'

server.listen(process.env.APP_PORT).on('listening', () => {
  console.log('NODE SERVER STARTED IN', process.env.APP_PORT)
})
