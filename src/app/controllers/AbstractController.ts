/** @format */

import { Request, Response } from 'express';
import DefaultController from './DefaultController';

/** @format */
abstract class AbstractController extends DefaultController {
  abstract _index(req: Request, res: Response): Promise<Response | void>;
  abstract _show(req: Request, res: Response): Promise<Response | void>;
  abstract _create(req: Request, res: Response): Promise<Response | void>;
  abstract _update(req: Request, res: Response): Promise<Response | void>;
  abstract _destroy(req: Request, res: Response): Promise<Response | void>;
}
export default AbstractController;
