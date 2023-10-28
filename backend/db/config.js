const mongoose = require('mongoose');
let connectionString = null;
if(process.env.IS_CURRENT_DB_CONNECTION=='local'){
    connectionString = process.env.LOCAL_MONGO_CONNECTION_STRING;
}else if(process.env.IS_CURRENT_DB_CONNECTION != 'local'){
    connectionString = process.env.ATLAS_MONGO_CONNECTION_STRING;
}

mongoose.connect(connectionString,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection is successfully")
}).catch((err)=>{
    console.error('no connection')
    console.error(err)
    console.error(err.errno)
    console.error(err.code)
    console.error(err.syscall)
    console.error(err.hostname)
});