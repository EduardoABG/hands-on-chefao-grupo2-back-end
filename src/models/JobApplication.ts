import { Schema, model } from "mongoose";
import { IUser } from "./User";
import { IJob } from "./Job";

export interface IJobApplication {
  status: string;
  feedback: string;
  tagsFeedback: string[];
  applicationDate: Date;
  user: Schema.Types.ObjectId | IUser;
  job: Schema.Types.ObjectId | IJob;
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
    type: Schema.Types.ObjectId,
    ref: "Job",
  },
},
  {timestamps: true}
);

export default model<IJobApplication>("JobApplication", jobApplicationSchema);