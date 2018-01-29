import { NextFunction, Request, Response } from 'express';

import * as service from '../services/pokemon';
import { validator } from '../validators/pokemonSave';

export async function save(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const model = await validator.validate(req.body);
		const result = await service.save(model);

		res.json(result);
	} catch (err) {
		next(err);
	}
}
