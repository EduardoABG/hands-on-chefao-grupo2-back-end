import { Schema, model } from "mongoose";

export interface IJob {
  name: string;
  description: string;
  salary: number;
  companyName: string;
  status: string;
  date: Date;
}

// Const explicando para o mongoose:
const jobSchema = new Schema <IJob> ({
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
},
{timestamps: true}
);

export default model<IJob>("Job", jobSchema); // Dará as diversas funções para manipular os dados dentro do mongoose.