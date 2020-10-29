const express = require("express")
const app=express();
const mongoose = require("mongoose")
const PORT = process.env.PORT || 5000
var path = require("path");

const {MONGOURI} = require('./keys')

mongoose.connect(MONGOURI,{useNewUrlParser:true,useUnifiedTopology:true})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeahh")
})

mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

//user schema
require('./models/user')
//post schema
// require('./models/post')

// app.use(express.static(path.join(__dirname, 'build')));


// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.use(express.json()) //for parsing json data 
app.use(require('./routes/auth')) //registering the route in the main file app.js
// app.use(require('./routes/post'))


app.listen(PORT,()=>{             // .listen for connections on the given path
    console.log("server is running on",PORT)
})

