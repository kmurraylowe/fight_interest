const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/database')
const authRoutes = require('./routes/auth')
const fightRoutes = require('./routes/fightRoutes')
const homeRoutes = require('./routes/home')

require('dotenv').config({path: './config/.env'})

require('./config/passport')(passport)

connectDB()


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

app.use(passport.initialize())
app.use(passport.session())

app.use('/', homeRoutes)
app.use('/fights', fightRoutes)
app.use('/auth', authRoutes)

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running `)
})



