import { StatusCodes } from "http-status-codes";
import Job from "../models/JobModel.js";
import { NotFoundError } from "../errros/customError.js";



  export const getAllJobs=async(req,res)=>{

    const jobs=await Job.find({})
    res.status(StatusCodes.OK).json({ jobs });


  }

  export const createJob=async(req,res)=>{

      const job=await Job.create(req.body)
      res.status(StatusCodes.CREATED).json({msg:job})
   
    
   
  }

  export const getSingleJob=async(req,res)=>{
    const { id } = req.params;
    const job = await Job.findById(id)
   
    res.status(StatusCodes.OK).json({ job });
  }

  export const editJob=async(req,res)=>{
   
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id,req.body,{
      new:true,
      
    })
    
   
    res.status(StatusCodes.OK).json({ msg: 'job modified', updatedJob });
  }

export const deleteJob=async(req,res)=>{
    const { id } = req.params;
    const removeJob = await Job.findByIdAndDelete(id)
    
  
    res.status(200).json({ msg: 'job deleted',job:removeJob });
  }