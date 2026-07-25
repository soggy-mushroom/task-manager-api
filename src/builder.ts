import SchemaBuilder from "@pothos/core";
import { DateResolver } from "graphql-scalars";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "../lib/pothos-prisma-types.js";
import { getDatamodel } from "../lib/pothos-prisma-types.js";
import { prisma } from "./db.js";

export const builder = new SchemaBuilder<{
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
   client: prisma,
   dmmf: getDatamodel(),
  },
});
``
builder.addScalarType("Date", DateResolver);
builder.queryType({});
builder.mutationType({});