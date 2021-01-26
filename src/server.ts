import express from 'express'
import bodyParser from 'body-parser'
import ip from 'ip'
import { promises } from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'
import cors from 'cors'
import moment from 'moment'

require('dotenv').config()

const server = express()

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, '../public')))


server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token')
  next()
})

server.post('/api/chulcheck', async (req, res) => {
  try {
    const user = process.env.USER_EMAIL
    const pwd = process.env.SMTP_PWD
    const { fromName, fromUser } = req.query
    if (!user || !pwd) {
      res.send({
        status: 400,
        message: 'SMTP Session Expired'
      })
      return
    }
    if (!fromUser || !fromName) {
      res.send({
        status: 4001,
        message: 'Invalid Arguments'
      })
      return
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.naver.com',
      port: 465,
      secure: true,
      auth: {
        user: user,
        pass: pwd
      }
    })
    const today = moment()
    await transporter.sendMail({
      from: {
        name: `${fromName}`,
        address: `${fromUser}`
      },
      to: 'wooisso@gmail.com',
      subject: `${today.format('YYMMDD')} ${fromName} 출근했습니다.`,
      sender: `${fromUser}`,
      replyTo: `${fromUser}`,
      html: `${today.format('M월 D일 HH:mm')} ${fromName} 출근했습니다.<br /><br />감사합니다.`
    })
    res.send({
      status: 200,
      message: {
        commutedAt: today.toJSON()
      }
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