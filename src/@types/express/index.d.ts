/** @format */

declare namespace Express {
  // must be namespace, and not declare module "Express" {
  export interface Request {
    userId: string;
    userName: string;
    sessionState: string;
    expiration: string;
    email: string;
    role: string;
  }
}
