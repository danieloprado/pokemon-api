import { BaseValidator, joi } from './base';

class PokemonBuyValidator extends BaseValidator<{ id: number, quantity: number }> {
	constructor() {
		super(joi.object({
			id: joi.number().integer().required().min(1),
			quantity: joi.number().integer().required().min(1)
		}));
	}
}

export const validator = new PokemonBuyValidator();
