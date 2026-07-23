// src/schema.ts

import { builder } from "./builder";

import "./models/Task";
import "./models/TaskList";

export const schema = builder.toSchema({});