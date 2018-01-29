import { expect, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';

import { ValidationError } from '../errors/validation';
import { IPokemon } from '../interfaces/pokemon';
import { validator } from './pokemonSave';

use(chaiAsPromise);

describe('validators/pokemonSave', () => {
	const model: Partial<IPokemon> = {
		id: 1,
		name: 'Charmander',
		price: 10,
		stock: 1
	};

	it('should return valid', () => {
		return expect(validator.validate(model)).to.eventually.be.fulfilled;
	});

	it('should return invalid of a minimun object', () => {
		return expect(validator.validate({ name: 'Test', price: 10 })).to.eventually.be.fulfilled;
	});

	it('should return invalid when id is not a number', () => {
		const data = { ...model, id: 'a' };
		return expect(validator.validate(data)).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('id');
			expect(err.data[0].type).to.be.equals('number.base');
		});
	});

	it('should return invalid when id is not an integer', () => {
		const data = { ...model, id: 2.2 };
		return expect(validator.validate(data)).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('id');
			expect(err.data[0].type).to.be.equals('number.integer');
		});
	});

	it('should return invalid when id is less than 1', () => {
		const data = { ...model, id: 0 };
		return expect(validator.validate(data)).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('id');
			expect(err.data[0].type).to.be.equals('number.min');
		});
	});

	it('should return invalid when name is not present', () => {
		const data = { ...model };
		delete data.name;
		return expect(validator.validate(data)).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('name');
			expect(err.data[0].type).to.be.equals('any.required');
		});
	});

	it('should return invalid when name greater than 150 caracs', () => {
		const data = { ...model, name: new Array(152).join('a') };
		return expect(validator.validate(data)).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('name');
			expect(err.data[0].type).to.be.equals('string.max');
		});
	});

	it('should return invalid when name greater than 150 caracs', () => {
		const data = { ...model, name: new Array(152).join('a') };
		return expect(validator.validate(data)).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('name');
			expect(err.data[0].type).to.be.equals('string.max');
		});
	});

	it('should return invalid when price is not present', () => {
		const data = { ...model };
		delete data.price;
		return expect(validator.validate(data)).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('price');
			expect(err.data[0].type).to.be.equals('any.required');
		});
	});

	it('should return invalid when price is not a number', () => {
		const data = { ...model, price: 'a' };
		return expect(validator.validate(data)).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('price');
			expect(err.data[0].type).to.be.equals('number.base');
		});
	});

	it('should return invalid when price is not an integer', () => {
		const data = { ...model, price: 2.2 };
		return expect(validator.validate(data)).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('price');
			expect(err.data[0].type).to.be.equals('number.integer');
		});
	});

	it('should return invalid when price is less than 0', () => {
		const data = { ...model, price: -1 };
		return expect(validator.validate(data)).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('price');
			expect(err.data[0].type).to.be.equals('number.min');
		});
	});

	it('should return invalid when stock is not a number', () => {
		const data = { ...model, stock: 'a' };
		return expect(validator.validate(data)).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('stock');
			expect(err.data[0].type).to.be.equals('number.base');
		});
	});

	it('should return invalid when stock is not an integer', () => {
		const data = { ...model, stock: 2.2 };
		return expect(validator.validate(data)).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('stock');
			expect(err.data[0].type).to.be.equals('number.integer');
		});
	});

	it('should return invalid when stock is less than 0', () => {
		const data = { ...model, stock: -1 };
		return expect(validator.validate(data)).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('stock');
			expect(err.data[0].type).to.be.equals('number.min');
		});
	});
});
