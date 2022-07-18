type User = {
  id: number;
  nome: string;
  email: string;
};

declare namespace Express {
  export interface Request {
    user?: User;
  }
}
