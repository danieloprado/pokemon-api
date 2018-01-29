import { IPokemon } from '../interfaces/pokemon';
import { BaseValidator, joi } from './base';

class PokemonSaveValidator extends BaseValidator<IPokemon> {
	constructor() {
		super(joi.object({
			id: joi.number().integer().allow(null).min(1),
			name: joi.string().trim().required().max(150),
			price: joi.number().integer().required().min(0),
			stock: joi.number().integer().allow(null).min(0).default(0)
		}));
	}
}

export const validator = new PokemonSaveValidator();
