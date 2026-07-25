import { GraphQLError } from "graphql";

export class AppError extends GraphQLError {
  constructor(
    message: string,
    code: string,
    extensions: Record<string, unknown> = {}
  ) {
    super(message, {
      extensions: {
        code,
        ...extensions,
      },
    });
  }
}