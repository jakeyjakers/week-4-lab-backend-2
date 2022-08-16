const houses = require('./db.json')
let globalId = 4

module.exports = {

    getHouses: (req, res) => {
        res.status(200).send(houses)
    },

    deleteHouse: (req, res) => {
        const index = houses.findIndex((house) =>{
            return house.id === +req.params.id
            
        })
        houses.splice(index, 1)
        res.status(200).send(houses)
    },

    createHouse: (req, res) => {
        let { address, price, imageUrl} = req.body
        
        let newHouse = {
            id: globalId,
            address,
            price,
            imageUrl
        }
        
        houses.push(newHouse)
        res.status(200).send(houses)
        globalId++
    },

    updateHouse: (req, res) => {
        let {id} = req.params
        let {type} = req.body
        const index = houses.findIndex((house) =>{
            return +house.id === +id
        })

        if(houses[index].price >= 1500000 && type === 'plus'){
            res.status(400).send(houses)
            console.log("Really? Who can afford that?")
        } else if(houses[index].price <= 10000 && type === "minus"){
            res.status(400).send(houses)
            console.log("That house is should probably get knocked down.")
        } else if(type === "plus" ){
            houses[index].price += 10000
            res.status(200).send(houses)
            console.log("Price Updated higer.")
        } else if (type === 'minus'){
            houses[index].price -= 10000
            res.status(200).send(houses)
            console.log("Price adjusted lower.")
        } else {
            res.sendstatus(400)
        }

    }

}