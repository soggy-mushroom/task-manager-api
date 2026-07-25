// src/schema.ts

import { builder } from "./builder";

import "./models/Task";
import "./models/TaskList";

import "./queries/Task";
import "./queries/TaskList";

export const schema = builder.toSchema({});