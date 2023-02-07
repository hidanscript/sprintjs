import { ServerResponse } from "http";
import { SprintRequest } from "./request.interface";

export interface Route {
  path: string;
  method: string;
  cb: RouteCallback;
  statusCode?: number;
}

export interface RouteCallback {
  (req: SprintRequest, res: ServerResponse): void;
}