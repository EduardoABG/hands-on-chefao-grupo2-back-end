import { Schema, model } from "mongoose";

export interface IJob {
  name: string;
  description: string;
  salary: number;
  companyName: string;
  status: string;
  date: Date;
  location: string;
  jobPicture: string;
  proficiency: string;
  workingTime: string;
  workingMode: string;
  hiringRegime: string;
  stage: [{
    title: string,
	  numberOfCandidates: number,
	  status: string,
  }];
}

// Const explicando para o mongoose:
export const jobSchema = new Schema <IJob> ({
  name: {
      type: Schema.Types.String,
  },
  description: {
      type: Schema.Types.String,
  },
  salary: {
      type: Schema.Types.Number,
  },
  companyName: {
      type: Schema.Types.String,
  },
  status: {
      type: Schema.Types.String,
  },
  date: {
      type: Schema.Types.Date,
  },
  location: {
    type: Schema.Types.String,
  },
  jobPicture: {
    type: Schema.Types.String,
  },
  proficiency: {
    type: Schema.Types.String,
  },
  workingTime: {
    type: Schema.Types.String,
  },
  workingMode: {
    type: Schema.Types.String,
  },
  hiringRegime: {
    type: Schema.Types.String,
  },
  stage: [{
    title: {
      type: Schema.Types.String,
    },
	  numberOfCandidates: {
      type: Schema.Types.Number,
    },
	  status: {
      type: Schema.Types.String,
    },
  }],
},
{ timestamps: true }
);

jobSchema.index({ "$**": "text" })

export default model<IJob>("Job", jobSchema); // Dará as diversas funções para manipular os dados dentro do mongoose.