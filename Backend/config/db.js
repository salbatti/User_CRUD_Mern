const mongoose = require('mongoose')

const connectionString='mongodb+srv://steve:steve@cluster0.akk7kxn.mongodb.net/?appName=Cluster0'

mongoose.connect(connectionString).then(res=>{
    console.log("MongoDB Connected");
    
})
.catch(err=>{
    console.log("MongoDB connection error "+ err);
    
})