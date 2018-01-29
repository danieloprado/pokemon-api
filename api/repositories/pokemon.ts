import { IPokemon } from '../interfaces/pokemon';
import { Pokemon } from '../models/pokemon';

export async function list(): Promise<Pokemon[]> {
	return await Pokemon.query();
}

export async function findById(id: number): Promise<Pokemon> {
	return await Pokemon.query().where({ id }).first();
}

export async function create(model: IPokemon): Promise<Pokemon> {
	return await Pokemon.query().insert(model).returning('*');
}

export async function update(model: IPokemon): Promise<Pokemon> {
	return await Pokemon.query().updateAndFetchById(model.id, model);
}
