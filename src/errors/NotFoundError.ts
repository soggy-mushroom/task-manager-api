import { AppError } from "./AppError";

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found.`, "NOT_FOUND");
  }
}