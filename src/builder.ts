import SchemaBuilder from "@pothos/core";
import { DateResolver } from "graphql-scalars";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "../lib/pothos-prisma-types.ts";
import { getDatamodel } from "../lib/pothos-prisma-types.ts";
import { prisma } from "./db";

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