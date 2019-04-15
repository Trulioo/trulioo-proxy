var express = require('express')
const request = require('request')
var bodyParser = require('body-parser')
const crypto = require('crypto')
const fs = require('fs')
require('dotenv').config()
var app = express()
 
const headers = {
  "Authorization": "Basic " + new Buffer(process.env.TRULIOO_USERNAME + ':' + process.env.TRULIOO_PASSWORD).toString("base64"),
  "Content-Type": "application/json",
  "User-Agent": "trulioo-proxy/1.0.0.0"
}

app.use(bodyParser.json({ limit: '50mb' }))
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/api/countryCodes', (_, res) => {
  request({ method: 'GET', url: process.env.TRULIOO_BASE_URL + '/configuration/v1/countrycodes/Identity%20Verification', headers: headers },
    (error, _, body) => {
      if (error) {
        throw new Error(error)
      }

      const signature = getSignatureByInput(body)

      res.setHeader('Content-Type', 'application/json')
      res.send({
        response: body,
        signature
      })
    })
})

app.get('/api/getFields/:countryCode', (req, res) => {
  request({ method: 'GET', url: process.env.TRULIOO_BASE_URL + '/configuration/v1/fields/Identity%20Verification/' + req.params.countryCode, headers: headers },
    (error, _, body) => {
      if (error) {
        throw new Error(error)
      }

      const signature = getSignatureByInput(body)

      res.setHeader('Content-Type', 'application/json')
      res.send({
        response: body,
        signature
      })
    })
})

app.get('/api/getCountrySubdivisions/:countryCode', (req, res) => {
  request({ method: 'GET', url: process.env.TRULIOO_BASE_URL + '/configuration/v1/countrysubdivisions/' + req.params.countryCode, headers: headers },
    (error, _, body) => {
      if (error) {
        throw new Error(error)
      }
      
      const signature = getSignatureByInput(body)

      res.setHeader('Content-Type', 'application/json')
      res.send({
        response: body,
        signature
      })
    })
})

app.get('/api/getConsents/:countryCode', (req, res) => {
  request({ method: 'GET', url: process.env.TRULIOO_BASE_URL + '/configuration/v1/consents/Identity%20Verification/' + req.params.countryCode, headers: headers },
    (error, _, body) => {
      if (error) {
        throw new Error(error)
      }
      const signature = getSignatureByInput(body)
      res.setHeader('Content-Type', 'application/json')
      res.send({
        response: body,
        signature
      })
    })
})

app.post('/api/verify', (req, res) => {
  request({
    method: 'POST', url: `${process.env.TRULIOO_BASE_URL}/verifications/v1/verify`, body: req.body, headers: headers, json: true
  },
    (error, _, body) => {
      if (error) {
        throw new Error(error)
      }
      const signature = getSignatureByInput(body)

      res.setHeader('Content-Type', 'application/json')
      res.send({
        response: body,
        signature
      })
    })
})

const getSignatureByInput = (input) => {
  const stringifiedInput = JSON.stringify(input)

  let privatePem = fs.readFileSync(process.env.PRIVATE_KEY_FILE_PATH)
  let key = privatePem.toString('ascii')
  let sign = crypto.createSign(process.env.SIGNATURE_ALGORITHM)
  sign.update(stringifiedInput)
  let signature = sign.sign(key, 'hex')

  return signature
}

module.exports = app