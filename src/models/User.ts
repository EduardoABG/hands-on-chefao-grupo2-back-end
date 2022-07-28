import { Schema, model } from "mongoose";
// Interface explicando para o TypeScript:
export interface IUser {
    name: string;
    email: string;
    password: string;
    phone: string;
    birthDate: Date;
    aboutMe: string;
    profilePicture: string;
    resume: {
        employmentHistory: String[];
        education: String[];
        certificates: String[];
        languages: String[];
        linkedin: String;
        portfolio: String;
        address: String;
        salary: number;
        RG: String;
        CPF: String;
    };
   favoriteJobs: String[];
}

// Const explicando para o mongoose:
const userSchema = new Schema <IUser> ({
    name: {
        type: Schema.Types.String,
    },
    email: {
        type: Schema.Types.String,
    },
    password: {
        type: Schema.Types.String,
    },
    phone: {
        type: Schema.Types.String,
    },
    birthDate: {
        type: Schema.Types.Date,
    },
    aboutMe: {
        type: Schema.Types.String,
    },
    profilePicture: {
        type: Schema.Types.String,
    },
    resume: {
        employmentHistory: [{ type: Schema.Types.String}],
        education: [{ type: Schema.Types.String}],
        certificates: [{ type: Schema.Types.String}],
        languages: [{ type: Schema.Types.String}],
        linkedin:{ type: Schema.Types.String},
        portfolio:{ type: Schema.Types.String},
        address:{ type: Schema.Types.String},
        salary:{ type: Schema.Types.Number},
        RG:{ type: Schema.Types.String},
        CPF:{ type: Schema.Types.String},
    },
    favoriteJobs: [{ type: Schema.Types.String}]
},
{timestamps: true}
);

export default model<IUser>("User", userSchema); // Dará as diversas funções para manpular os dados dentro do mongoose.