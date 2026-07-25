import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found.`, "NOT_FOUND");
  }
}