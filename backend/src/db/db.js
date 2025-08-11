const mongoose = require('mongoose');
const connectionToDB= ()=>{
  mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected to db")
  })
}
module.exports = connectionToDB