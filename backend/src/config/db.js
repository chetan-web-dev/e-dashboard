const mongoose = require('mongoose');

const mongoUri = process.env.NODE_ENV === "production"
                    ? process.env.MONGO_URI_PROD
                    : process.env.MONGO_URI_LOCAL;

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MondoDB Connected successfully...")
}).catch((err) => {
    console.error('MondoDB connection error!')
    console.error(err)
    console.error(err.errno)
    console.error(err.code)
    console.error(err.syscall)
    console.error(err.hostname)
});