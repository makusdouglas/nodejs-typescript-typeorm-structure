import server from './app'

server.listen(3333).on('listening', () => {
  console.log('NODE SERVER STARTED')
})
