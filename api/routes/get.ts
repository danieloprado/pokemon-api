import { NextFunction, Request, Response } from 'express';

import * as repository from '../repositories/pokemon';

export async function get(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const result = await repository.list();
		res.json(result);
	} catch (err) {
		next(err);
	}
}
