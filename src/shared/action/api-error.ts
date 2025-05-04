export class ApiError<T> extends Error {
  constructor(
    message?: string,
    public details?: {
      fields?: {
        field: T;
        message: string;
      }[];
    },
  ) {
    super(message);
    this.name = "ApiError";
  }
}
