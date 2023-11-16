require('dotenv').config()
const midtransClient = require("midtrans-client")
const { Transaction, Transportation } = require("../models/index")
class car{
    static async rentCar(req,res,next){
        try {
            const {id} = req.params
            console.log(req.body);
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : process.env.SERVER_KEY_MIDTRANS
            });

            const lastId = new Date().getTime()

            
        let parameter = {
            "transaction_details": {
                "order_id": 'ZA-' + lastId,
                "gross_amount": req.body.price
            }
        };
        
        snap.createTransaction(parameter)
            .then(async(transaction)=>{
                // transaction token
                let transactionToken = transaction.token;
                await Transaction.create({
                    orderId : 'ZA-' + lastId,
                    clientId : req.user.dataValues.id,
                    status : "pending",
                    transportationId : id
                })
                res.status(200).json(transactionToken)
                // console.log('transactionToken:',transactionToken);
            })
        } catch (error) {
            next(error)
        }
    }

    static async rentStatus(req,res,next){
        try {


            const transaction = await Transaction.update({
                status : req.body.transaction_status
            }, {
                where :{
                    orderId : req.body.order_id
                },
                returning: true
            })

            if(req.body.transaction_status === "settlement") {
                const transportationId = transaction[1][0].dataValues.transportationId
                await Transportation.update({
                    status: "rent"
                }, {
                    where: {
                        id: transportationId
                    }
                })
            }

            res.sendStatus(200)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = car;