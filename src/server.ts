import express from 'express'
import bodyParser from 'body-parser'
import ip from 'ip'
import { promises } from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'
import cors from 'cors'

require('dotenv').config()

const server = express()

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, '../public')))
server.use(cors())

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token')
  next()
})

server.post('/api/chulcheck', async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.naver.com',
      port: 465,
      secure: true,
      auth: {
        user: 'wooisso@naver.com',
        pass: '9QUJQ3Y811JH'
      }
    })
    await transporter.sendMail({
      from: {
        name: '조연우',
        address: 'wooisso@naver.com'
      },
      to: 'wooisso@gmail.com',
      subject: 'Test Mail From PWA',
      sender: 'yeonwoo.cho@yonsei.ac.kr',
      replyTo: 'yeonwoo.cho@yonsei.ac.kr',
      html: 'test<br />teete'
    })
    res.send({
      status: 200,
      message: 'Success'
    })
  } catch (e) {
    console.log(e)
    res.send({
      status: 500,
      message: 'Internal Server Error'
    })
  }
})

server.listen(process.env.PORT || 3001, () => {
  console.log(`Server is Running on: http://${ip.address()}:${process.env.PORT || 3001}`)
})

server.use(cors())

module.exports = server