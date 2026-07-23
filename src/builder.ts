import SchemaBuilder from "@pothos/core";
import { DataResolver } from "graphql-scalars";

export const builder = new SchemaBuilder<{
  Scalars: {
    Date: { Input: Date; Output: Date };
  };
}>({});

builder.addScalarType("Date", DateResolver);