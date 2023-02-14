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
    pool.query('SELECT SUM("quantity") AS numlivestock FROM "Livestock"',(error,results)=>{
        if(error){
            throw error
        }
        response.status(200).send(results.rows)
    })
}

const registeredLivestockperMonth = (request, response)=>{

    pool.query(`SELECT DATE_TRUNC('month',"createdAT") AS  registered_month, COUNT(quantity) AS count FROM "Livestock" GROUP BY DATE_TRUNC('month',"createdAT") ORDER BY DATE_TRUNC('month',"createdAT");`,(error,results)=>{
        if (error) {
            throw error
          }
          response.status(200).send(results.rows)
    })
}

const getAllOrders  = (request, response)=>{
    pool.query('SELECT COUNT("status") AS Number_of_Orders FROM "public"."Transaction"',(error , results)=>{
        if(error){
            throw error
        }
        response.status(200).send(results.rows)
    })

}

const getNumCompleteOrders = (request , response) =>{
pool.query(`SELECT COUNT("status") AS Number_of_Completed_Orders FROM "public"."Transaction" WHERE status = 'complete'`,(error,results)=>{
if(error){
    throw error
}
response.status(200).send(results.rows)
})
}

const getNumPendingOrders = (request , response) =>{
    pool.query(`SELECT COUNT("status") AS Number_of_Pending_Orders FROM "public"."Transaction" WHERE status = 'pending'`,(error,results)=>{
    if(error){
        throw error
    }
    response.status(200).send(results.rows)
    })
    }

const getNumInProgressOrders = (request , response) =>{
        pool.query(`SELECT COUNT("status") AS Number_of_In-progress_Orders FROM "public"."Transaction" WHERE status = 'In-progress'`,(error,results)=>{
        if(error){
            throw error
        }
        response.status(200).send(results.rows)
 })
 }

 const getNumArchieveOrders = (request , response) =>{
    pool.query(`SELECT COUNT("status") AS Number_of_Archieved_Orders FROM "public"."Transaction" WHERE status = 'archieved'`,(error,results)=>{
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
    getNumArchieveOrders
}
