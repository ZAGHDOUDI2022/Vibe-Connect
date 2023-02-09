const express = require('express')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const uploadRoutes = require('./routes/upload.routes')
require('dotenv').config({path:'./config/.env'})
const connectDB = require("./config/db");
const cors = require('cors')



const app = express()
connectDB()

//to serve images for public
app.use(express.static('public')); 
app.use('/images', express.static('images'));



//middlware  
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())



//routes
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/upload', uploadRoutes)
//server
app.listen(process.env.PORT,()=>{
    console.log(`listening on port ${process.env.PORT}`)
})
