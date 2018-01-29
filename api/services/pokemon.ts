import axios from 'axios';

import { ClientError } from '../errors/client';
import { ServiceError } from '../errors/service';
import { IPokemon } from '../interfaces/pokemon';
import { Pokemon } from '../models/pokemon';
import * as repository from '../repositories/pokemon';

export async function save(model: IPokemon): Promise<Pokemon> {
	return !model.id ? repository.create(model) : repository.update(model);
}

export async function buy(id: number, quantity: number): Promise<void> {
	const pokemon = await repository.findById(id);

	if (!pokemon) {
		throw new ClientError('pokemon-not-found', { id });
	}

	if (pokemon.stock < quantity) {
		throw new ClientError('pokemon-out-of-stock', { stock: pokemon.stock });
	}

	const { success, statusCode, response } = await requestBuy(pokemon, quantity);

	if (!success) {
		throw new ServiceError('pagarme-error', { statusCode, response });
	}

	pokemon.stock -= quantity;
	await repository.update(pokemon);
}

async function requestBuy(pokemon: Pokemon, quantity: number): Promise<{
	success: boolean,
	statusCode: number,
	response: any
}> {
	const { data, status } = await axios.post<{ status: string }>('https://api.pagar.me/1/transactions', {
		api_key: 'ak_test_WHgSu2XFmvoopAZMetV3LfA2RfEEQg',
		amount: pokemon.price * quantity,
		card_number: '4024007138010896',
		card_expiration_date: '1050',
		card_holder_name: 'Ash Ketchum',
		card_cvv: '123',
		metadata: {
			product: 'pokemon',
			name: pokemon.name,
			quantity
		}
	});

	return {
		success: (data || {} as any).status === 'paid',
		statusCode: status,
		response: data
	};
}
