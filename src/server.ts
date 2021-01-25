import express from 'express'
import bodyParser from 'body-parser'
import ip from 'ip'
import { promises } from 'fs'
import path from 'path'

require('dotenv').config()

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, '../public')))

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token')
  next()
})

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/index.html'))
})

server.listen(process.env.PORT || 5000,() => {
  console.log(`Server is Running on: http://${ip.address()}:${process.env.PORT || 5000}`)
})

module.exports = server