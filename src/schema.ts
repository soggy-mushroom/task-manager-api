// src/schema.ts

import { builder } from "./builder.js";

import "./models/Task";
import "./models/TaskList";

import "./queries/Task";
import "./queries/TaskList";

import "./mutations/TaskList"
import "./mutations/Task"

export const schema = builder.toSchema({});