export default interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  birthDate?: Date;
  aboutMe?: string;
  profilePicture?: string;
  resume?: {
    employmentHistory?: String[];
    education?: String[];
    certificates?: String[];
    languages?: String[];
    linkedin?: String;
    portfolio?: String;
    address?: String;
    salary?: number;
    RG?: String;
    CPF?: String;
  };
  favoriteJobs?: String[];
};