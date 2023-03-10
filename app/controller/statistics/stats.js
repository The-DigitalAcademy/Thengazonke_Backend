const { request, response } = require('express')

const pool = require('../../config/connection')

const getNumUsers = (req,res)=>{

    pool.query('SELECT COUNT("Userid") AS numUsers FROM "Users";',(error ,results)=>{
    if(error){
        throw error
    }
    res.status(200).json(results.rows)
    })
  }

const registeredUserperMonth = (request, response)=>{

    pool.query(`SELECT DATE_TRUNC('month',"createdAt") AS  registered_month, COUNT("Userid") AS count FROM "Users" GROUP BY DATE_TRUNC('month',"createdAt") ORDER BY DATE_TRUNC('month',"createdAt");`,(error,results)=>{
        if (error) {
            throw error
          }
          response.status(200).send(results.rows)
    })
}

const getNumLivestock = (request, response)=>{
    pool.query('SELECT COUNT("livestockID") AS numlivestock FROM "Livestock"',(error,results)=>{
        if(error){
            throw error
        }
        response.status(200).send(results.rows)
    })
}

const registeredLivestockperMonth = (request, response)=>{

    pool.query(`SELECT DATE_TRUNC('month',"createdAT") AS  registered_month, COUNT("livestockID") AS count FROM "Livestock" GROUP BY DATE_TRUNC('month',"createdAT") ORDER BY DATE_TRUNC('month',"createdAT");`,(error,results)=>{
        if (error) {
            throw error
          }
          response.status(200).send(results.rows)
    })
}

const getAllOrders  = (request, response)=>{
    pool.query('SELECT COUNT("status") AS NumberofOrders FROM "public"."Transaction"',(error , results)=>{
        if(error){
            throw error
        }
        response.status(200).send(results.rows)
    })

}

const getNumCompleteOrders = (request , response) =>{
pool.query(`SELECT COUNT("status") AS NumberofCompletedOrders FROM "public"."Transaction" WHERE status = 'complete'`,(error,results)=>{
if(error){
    throw error
}
response.status(200).send(results.rows)
})
}

const getNumPendingOrders = (request , response) =>{
    pool.query(`SELECT COUNT("status") AS NumberofPendingOrders FROM "public"."Transaction" WHERE "status" = 'pending'`,(error,results)=>{
    if(error){
        throw error
    }
    response.status(200).send(results.rows)
    })
    }

const getNumInProgressOrders = (request , response) =>{
        pool.query(`SELECT COUNT("status") AS NumberofInprogressOrders FROM "public"."Transaction" WHERE "status" = 'Inprogress'`,(error,results)=>{
        if(error){
            throw error
        }
        response.status(200).send(results.rows)
 })
 }

 const getNumArchieveOrders = (request , response) =>{
    pool.query(`SELECT COUNT("status") AS NumberofArchievedOrders FROM "public"."Transaction" WHERE "status" = 'archived'`,(error,results)=>{
    if(error){
        throw error
    }
    response.status(200).send(results.rows)
})
}

 
module.exports = {
    getNumUsers,
    registeredUserperMonth,
    getNumLivestock,
    registeredLivestockperMonth,
    getNumCompleteOrders,
    getAllOrders,
    getNumPendingOrders,
    getNumInProgressOrders,
    getNumArchieveOrders,
}
