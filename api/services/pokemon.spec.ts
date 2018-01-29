import { expect, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';

import { IPokemon } from '../interfaces/pokemon';
import { Pokemon } from '../models/pokemon';
import * as service from './pokemon';

use(chaiAsPromise);

describe('services/pokemon', () => {
	const model: IPokemon = {
		name: 'Charmander 123',
		price: 10,
		stock: 1
	};

	it('should be able to create an pokemon', () => {
		return expect(service.save(model)).to.be.eventually.fulfilled.then((result: Pokemon) => {
			expect(result).to.be.an.instanceOf(Pokemon);
			expect(result.id).to.be.greaterThan(0);
			expect(result.name).to.be.equal(model.name);
			expect(result.price).to.be.equal(model.price);
			expect(result.stock).to.be.equal(model.stock);
		});
	});

	it('should be able to update an pokemon', () => {
		const data = { id: 1, name: 'Charmander 1234', price: 15, stock: 17 };
		return expect(service.save(data)).to.be.eventually.fulfilled.then((result: Pokemon) => {
			expect(result).to.be.an.instanceOf(Pokemon);
			expect(result.name).to.be.equal(data.name);
			expect(result.price).to.be.equal(data.price);
			expect(result.stock).to.be.equal(data.stock);
		});
	});

});
