const mongoos=require('mongoose');
require('dotenv').config();

mongoos.connect(process.env.mongo_URL).then(
    ()=>{
        console.log('Connected to database')
    }
)
.catch((err)=>{
    console.log("Could not connect to database" + err);

})