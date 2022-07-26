import { ValidationError } from "express-validation";
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

const handleError = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidationError) {
        return res.status(error.statusCode).json(error.details);
    }

    return res.status(error.status || 500).json(error);
};

export default handleError;