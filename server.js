
import 'express-async-errors'
import * as dotenv from 'dotenv';

dotenv.config()

import express from 'express'
const app=express()
import morgan from 'morgan';

import mongoose from 'mongoose';


//routers
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js'
//middlewares
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';




if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
 }

 const port = process.env.PORT || 5100;
//middlewares
app.use(morgan('dev'));
app.use(express.json())

app.get('/',(req,res)=>{
res.send('hello world')
})






app.use('/api/v1/jobs',jobRouter)
app.use('/api/v1/auth',authRouter)




app.use('*',(req,res)=>{
res.status(404).json({msg:'Route not found!'})
})



/* app.use((err,req,res,next)=>{
console.log(err);
res.status(500).json({msg:'something went wrong'})
}) */
app.use(errorHandlerMiddleware)


try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(5100,()=>{
        console.log(`server is listening to port ${port}`);
    })
} catch (error) {
    console.log(error);
    process.exit(1)
}
