require('dotenv').config()

const express = require("express")
const mongoose = require ("mongoose")
const congesRoutes = require('./routes/conges')
const userRoutes = require('./routes/user')
const bodyParser = require('body-parser');
//express app
const app = express()

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//middleware
app.use(express.json())
app.use((req ,res ,next)=>{
    console.log(req.path , req.method)
    next()
})
//routes
app.use('/api/conges', congesRoutes)
app.use('/api/user', userRoutes)

// connect to db 
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, ( )=>{
      console.log("connect to db & listening on port ",process.env.PORT)

})

  })
  .catch((error) => {
    consple.log(error)
  })
