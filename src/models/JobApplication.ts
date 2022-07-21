import { Schema, model } from "mongoose";
import { IUser } from "./User";
import { IJob } from "./Job";

export interface IJobApplication {
  status: string;
  feedback: string;
  tagsFeedback: string[];
  applicationDate: Date;
  user: Schema.Types.ObjectId | IUser;
  job: {
    _id:  Schema.Types.ObjectId | IJob,
    name: string,
    companyName: string,
  },
}

// Const explicando para o mongoose:
const jobApplicationSchema = new Schema <IJobApplication> ({
  status: {
      type: Schema.Types.String,
  },
  feedback: {
      type: Schema.Types.String,
  },
  tagsFeedback: [{
      type: Schema.Types.String,
  }],
  applicationDate: {
      type: Schema.Types.Date,
  },
  user: {
      type: Schema.Types.ObjectId,
      ref: "User",
  },
  job: {
      _id: { type: Schema.Types.ObjectId, ref: "Job" },
      name: { type: Schema.Types.String},
      companyName: { type: Schema.Types.String},
  },
},
  {timestamps: true}
);

export default model<IJobApplication>("JobApplication", jobApplicationSchema);