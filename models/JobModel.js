import mongoose from "mongoose";
import { JOB_STATUS,JOB_TYPE } from "../utils/constants.js";

const JobScehma=new mongoose.Schema(
    {
        company: String,
        position: String,
        jobStatus: {
          type: String,
          enum: Object.values(JOB_STATUS),
          default: JOB_STATUS.PENDING
        },
        jobType: {
          type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
        },
        jobLocation: {
          type: String,
          default: 'my city',
        },
      },
      { timestamps: true }
)
export default mongoose.model('Job', JobScehma);