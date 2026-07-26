# task-manager-api

GraphQL API server for managing task lists.

## Setup Instructions

To start the GraphQL server, run:

```bash
npm run dev
```

Then navigate to:

```
localhost:4000/graphql
```

to interact with the API and test queries and mutations (which you can find in `src/graphql`).

To have a visual overview of the database, run:

```bash
npx prisma studio
```

To run the test suite:

```bash
npm run test
```

## Decisions

### Testing

I wrote unit tests for the `tasks` query and the `addTask` mutation, as I believe these cover some of the core business logic in the API. The `tasks` query was chosen because it is one of the more complex operations, supporting both filtering by completion status and pagination. The `addTask` mutation was chosen because it covers input validation and creating records in the database.

For easier testing and separation of concerns, I extracted the resolver logic for these into standalone functions. 

### Pagination

I chose an offset-based pagination approach using `skip` and `take`.
I felt this was a suitable choice for this project because it is a lightweight task management tool where users are likely to view tasks page by page.

If the dataset became significantly larger, cursor-based pagination would likely be a more efficient approach, as offset pagination can become less performant when working with large datasets.

### Error Handling

I implemented a custom GraphQL error class so that errors can be handled consistently across the API.

This approach can be reused for cases such as requesting a task that does not exist for both queries and mutations, while also allowing more readable and structured errors to be returned to the client.

## What I Would Do Differently

Normally, I would use a Test-Driven Development (TDD) approach when implementing resolvers, as this gives more confidence while building and changing functionality.

I would also create a simple React-based UI to make interacting with the API easier for users, with reusable components for managing task lists and tasks.

For error handling, I would expand the custom error system with more specialised error types (for example, a `BadUserInput` error) to provide more detailed info for validation failures.