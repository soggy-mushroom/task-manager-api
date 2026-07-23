import { createYoga } from "graphql-yoga";
import { createServer } from "http";
import { schema } from "./schema";

const yoga = createYoga({ schema });
const server = createServer(yoga);

server.listen(4000, "127.0.0.1");