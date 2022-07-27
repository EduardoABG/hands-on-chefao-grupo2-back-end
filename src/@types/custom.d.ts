type User = {
  id: number;
  nome: string;
  email: string;
  password: string;
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

