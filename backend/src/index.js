import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { Token } from '../model/tokens.model.js'
import { Starbucks } from '../model/starbucks.model.js'
import { User } from '../model/user.model.js'
import { getToken, checkValidationPhone, sendTokenToSMS } from './token.js'
import { scrap } from './scrap.js'
import { checkValidationEmail, getWelcomeTemplate, sendWelcomeTemplateToEmail } from './email.js'
import { options } from '../swagger/config.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

const app = express()
const port = 3000
app.use(express.json())

const openapiSpecification = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/starbucks', async (req, res) => {
  const menu = await Starbucks.find()
  res.send(menu)
})

app.get('/users', async (req, res) => {
  const users = await User.find()
  res.send(users)
})

app.post('/user', async (req, res) => {
  const result = await Token.findOne({ phone: req.body.phone }).exec()
  const body = req.body
  console.log("body!!!!!!!!!!!",body)
  if(result && result.isAuth) {
    const og = await scrap(body.prefer)
    const name = body.name
    const email = body.email
    const personal = (body.personal).split("-")[0] + "-" + "*******"
    const prefer = body.prefer
    const pwd = body.pwd
    const phone = body.phone
    
    const user = new User({ og, name, email, personal, prefer, pwd, phone })
    
    user.save()

    if(checkValidationEmail(email)) {
      const template = getWelcomeTemplate(body)
      await sendWelcomeTemplateToEmail(email, template)
    }

    res.send(user._id)

  }else {
    res.status(422).send({msg: "핸드폰번호가 인증되지 않았습니다."})
  }
})

app.post('/tokens/phone', async (req, res) => {
  const phone = req.body.phone
  const isValid = checkValidationPhone(phone)
  let makeToken = getToken(6);

  if(isValid) {
    // 실제 문자 보내는 API(개발시 주석처리)
    // sendTokenToSMS(phone, makeToken);
    
    const checkDuplicate = await Token.findOne({ phone }).exec()

    if(checkDuplicate) {
      await Token.updateOne({phone},{'token':makeToken, 'isAuth': false})
    }else {
      const token = new Token({
        token: makeToken, 
        phone: phone, 
        isAuth: false
      })
      
      await token.save()
    }
    res.send({message: '핸드폰으로 인증 문자가 전송되었습니다!', status: true})

  }else {
    res.send({message: '핸드폰 번호를 확인하세요!', status: false})
  }

})

app.patch("/tokens/phone", async (req, res) => {
  const result = await Token.findOne({ phone: req.body.phone }).exec()
  
  if(!result || result.token !== req.body.token) {
    res.send(false)
  }
  else {
    await Token.updateOne({ phone: req.body.phone }, { isAuth: true })
    res.send(true)
  }

})

// mongoDB connect
await mongoose.connect('mongodb://portfolio01-mongodb:27017/dockerDB');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})