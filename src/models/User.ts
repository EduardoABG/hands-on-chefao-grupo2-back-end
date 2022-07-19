import { Schema, model } from "mongoose";
// Interface explicando para o TypeScript:
interface IUser {
    id: number;
    name: string;
    email: string;
}
// Const explicando para o mongoose:
const userSchema = new Schema <IUser> ({
    id: {
        type: Schema.Types.Number,
    },
    name: {
        type: Schema.Types.String,
    },
    email: {
        type: Schema.Types.String,
    },
},
{timestamps: true}
);

export default model<IUser>("User", userSchema); // Dará as diversas funções para manpular os dados dentro do mongoose.