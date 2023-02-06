import { IncomingMessage, ServerResponse } from "http";

export interface IRoute {
  route: string;
  method: string;
  cb: (req: IncomingMessage, res: ServerResponse) => void;
  statusCode?: number;
}