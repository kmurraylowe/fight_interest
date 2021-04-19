const fModels = require('../models/fightModels')

module.exports = {
    getFights: async (req,res)=>{
        try{
            const fightItems = await fModels.find().sort({for: -1})
            res.render('index.ejs', {items: fightItems})
        }
        catch(err){
            console.log(err)
        }
    },

    addFight: async (req,res)=>{
        try {
            await fModels.create({User: req.user.displayName, Fighter1: req.body.Fighter1, Fighter2: req.body.Fighter2, for: 0, against: 0})
            console.log("Fight Added")
            res.redirect('/fights')
        } catch (error) {
            console.log(error)
        }
    },

    addOneFor: async (req, res)=>{
        try {
            await fModels.findOneAndUpdate({_id: req.body.fightId},{
                for: req.body.forFight + 1
            })
            
            console.log("add for")
            res.json("Added one for")
           
        } catch (error) {
            console.log(error)
        }
    },

    addOneAgainst: async (req, res)=>{
        try {
            await fModels.findOneAndUpdate({_id: req.body.fightId},{
                against: req.body.againstFight  -1
            })
            console.log("add against")
            res.json("Added one against")
            
        } catch (error) {
            console.log(error)
        }
    },

    deleteFight: async (req, res)=>{
        try {
           await fModels.findOneAndDelete({_id: req.body.fightId}) 
           console.log('Deleted Todo')
           res.json('Deleted It')
       }catch(err){
           console.log(err)
        }
    }



}