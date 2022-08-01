import { Schema, model } from "mongoose";
import { IUser } from "./User";
import { IJob } from "./Job";

export interface IJobApplication {
  status: number;
  feedback: {
    letter:  string,
    area: [{
	    tittle: string,
	    content: [{
	      text: string,
	      link: string,
	    }],
	  }],
  };
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
      type: Schema.Types.Number,
  },
  feedback: {
    letter:  Schema.Types.String,
    area: [{
	    tittle: Schema.Types.String,
	    content: [{
	      text: Schema.Types.String,
	      link: Schema.Types.String,
	    }],
	  }]
  },
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