/** @format */

import { Request, Response } from 'express';
import DefaultController from './DefaultController';

/** @format */
abstract class AbstractController extends DefaultController {
  abstract _index(req: Request, res: Response): Promise<Response | void>; // list One
  abstract _show(req: Request, res: Response): Promise<Response | void>; // List all
  abstract _create(req: Request, res: Response): Promise<Response | void>; // store in database
  abstract _update(req: Request, res: Response): Promise<Response | void>; // update in database
  abstract _destroy(req: Request, res: Response): Promise<Response | void>; // remove from database
}
export default AbstractController;
