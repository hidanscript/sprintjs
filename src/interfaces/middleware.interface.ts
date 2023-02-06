import { ServerResponse } from "http";
import { SprintRequest } from "../interfaces/request.interface";

export interface Middleware {
  (req: SprintRequest, res: ServerResponse): void;
}