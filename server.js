import * as dotenv from 'dotenv';

dotenv.config()

import express from 'express'
import morgan from 'morgan';
import jobRouter from './routes/jobRouter.js';
import mongoose from 'mongoose';

const app=express()





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


app.post('/',(req,res)=>{
    console.log(req);
    res.json({ message: 'Data received', data: req.body });
})



app.use('/api/v1/jobs',jobRouter)





app.use('*',(req,res)=>{
res.status(404).json({msg:'Route not found!'})
})

app.use((err,req,res,next)=>{
console.log(err);
res.status(500).json({msg:'something went wrong'})
})


try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(5100,()=>{
        console.log(`server is listening to port ${port}`);
    })
} catch (error) {
    console.log(error);
    process.exit(1)
}
