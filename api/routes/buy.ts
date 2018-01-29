import { NextFunction, Request, Response } from 'express';

import * as service from '../services/pokemon';
import { validator } from '../validators/pokemonBuy';

export async function buy(req: Request, res: Response, next: NextFunction): Promise<void> {
	try {
		const model = await validator.validate(req.body);
		await service.buy(model.id, model.quantity);

		res.send({ message: 'Sucesso' });
	} catch (err) {
		if (err.message === 'pokemon-not-found') {
			res.status(404).json({ message: 'Pokémon não encontrado' });
			return;
		}

		if (err.message === 'pokemon-out-of-stock') {
			res.status(400).json({ message: `Fora de estoque, estoque atual: ${err.data.stock}` });
			return;
		}

		next(err);
	}
}
