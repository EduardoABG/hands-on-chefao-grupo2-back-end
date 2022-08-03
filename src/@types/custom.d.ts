type User = {
  name: string;
  email: string;
  picture: string;
};

interface filetype {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

declare namespace Express {
  export interface Request {
    user?: User;
    file: filetype;
  }
}

