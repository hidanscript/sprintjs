import { IncomingMessage } from "http";

export interface SprintRequest extends IncomingMessage {
  body: any;
  query: any;
  params: any;
  session: any;
};