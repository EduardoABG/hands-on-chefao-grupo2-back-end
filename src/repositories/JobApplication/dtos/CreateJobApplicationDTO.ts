import { Schema } from "mongoose";
import { IUser } from "../../../models/User";
import { IJob } from "../../../models/Job";

export default interface CreateJobApplicationDTO {
  status: number;
  applicationDate: Date;
  user: Schema.Types.ObjectId | IUser;
  job: {
    _id: Schema.Types.ObjectId | IJob;
    name: string;
    companyName: string;
  }
}