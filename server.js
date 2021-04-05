const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
require('dotenv').config()

let db,
    connectionString = process.env.DB_STRING
    dbName = "fight-interest"

MongoClient.connect(connectionString, {useUnifiedTopology: true})
 .then(client=>{
     console.log(`Connected to ${dbName} Database`)
     db = client.db(dbName)
 })
 .catch(err => console.error(err))


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

app.get('/', (req,res)=>{
    db.collection(dbName).find().sort({for: -1}).toArray()
    .then( data => {
        res.render('index.ejs', {items: data})
    })
    .catch(err => console.error(err)) 
})

app.post('/addFight', (req,res)=>{
    db.collection(dbName).insertOne({Fighter1: req.body.Fighter1, Fighter2: req.body.Fighter2, for: 0, against: 0})
    .then(result=>{
        console.log("Fight Added")
        res.redirect('/')
    })
    .catch(err=> console.error(err))
})

app.put('/addOneFor', (req,res)=>{
    db.collection(dbName).updateOne({Fighter1: req.body.upFight1, Fighter2: req.body.upFight2, for: req.body.forFight},{
        $set: {
            for: req.body.forFight + 1
        }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Added One Like')
        res.json('Like Added')
    })
    .catch(error => console.error(error))
})

app.put('/addOneAgainst', (req,res)=>{
    db.collection(dbName).updateOne({Fighter1: req.body.upFight1, Fighter2: req.body.upFight2, against: req.body.againstFight},{
        $set: {
            against: req.body.againstFight + 1
        }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Added One against')
        res.json('against Added')
    })
    .catch(error => console.error(error))
})
   
  
    


app.delete('/deleteFight', (req,res)=>{
    db.collection(dbName).deleteOne({Fighter1: req.body.delFight1, Fighter2: req.body.delFight2})
    .then(result => {
        console.log('Fight Deleted')
        res.json("Fight Deleted")
    })
    .catch(err => console.error(err))
})

