const express = require('express')
require('./db')
require("dotenv").config()



const userRouter = require('./routes/AuthRoutes.js')

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())  

app.use('/api/v1/auth',userRouter)

app.get('/',(req,res)=>{
   
    console.log("This is Home Page")
})



app.listen(PORT, ()=>{
    console.log(`App is running on port ${PORT}`);
})