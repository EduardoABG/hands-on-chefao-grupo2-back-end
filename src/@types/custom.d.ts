type User = {
  id: number;
  nome: string;
  email: string;
  password: string;
};

declare namespace Express {
  export interface Request {
    user?: User;
  }
}

