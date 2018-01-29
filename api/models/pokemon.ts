import { Model } from 'objection';

import { IPokemon } from '../interfaces/pokemon';

export class Pokemon extends Model implements IPokemon {
	public id: number;
	public name: string;
	public price: number;
	public stock: number;

	static get tableName(): string {
		return 'pokemon';
	}
}
