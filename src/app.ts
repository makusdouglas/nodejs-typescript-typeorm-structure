import express from 'express'
import 'src/app/controllers/UsersController'

const server = express()
server.use(express.json())

export default server
