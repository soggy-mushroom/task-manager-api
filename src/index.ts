import { createYoga } from "graphql-yoga";
import { createServer } from "http";

const yoga = createYoga({});
const server = createServer(yoga);

server.listen(4000, "127.0.0.1");