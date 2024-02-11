import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware=(err,req,res,next)=>{
    console.log(err);
    const StatusCode=err.StatusCode||StatusCodes.INTERNAL_SERVER_ERROR
    const msg=err.message||'something went wrong,try again'
    res.status(StatusCode).json({msg})
    }


export default errorHandlerMiddleware