require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const User = require("./models/userModel")

const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.post("/signup", async (req, res) => {
    const { fullname, email, confirmedPassword } = req.body
    console.log(req.body)

    try {
        const user = await User.signup(fullname, email, confirmedPassword)
    
        res.status(200).json({user})
      } catch (error) {
        res.status(400).json({error: error.message})
      }
})

app.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    res.status(200).json(user)
  } catch (error) {
    console.log(error.message)
    res.status(400).json({error: error.message})
  }
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })