class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;