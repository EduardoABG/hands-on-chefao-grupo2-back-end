import { Schema, model } from "mongoose";

export interface IMentoring {
  name: string;
  description: string;
  price: number;
}

// Const explicando para o mongoose:
const mentoringSchema = new Schema <IMentoring> ({
  name: {
      type: Schema.Types.String,
  },
  description: {
      type: Schema.Types.String,
  },
  price: {
      type: Schema.Types.Number,
  },
},
{timestamps: true}
);

export default model<IMentoring>("Mentoring", mentoringSchema);