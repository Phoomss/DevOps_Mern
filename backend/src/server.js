const express = require('express')
const cors = require('cors');
const connectDB = require('./lib/db');
const rootRouter = require('./routes/indexRoutes');
require('dotenv').config({path:'.env'})

const app = express()
const PORT = process.env.PORT || 3000;
connectDB()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: false, limit: '10mb' }))

app.use('/api',rootRouter)

app.listen(PORT,()=>{
    console.log('Server is running on port: ' + PORT);
})