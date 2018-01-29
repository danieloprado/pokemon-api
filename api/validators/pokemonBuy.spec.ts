import { expect, use } from 'chai';
import * as chaiAsPromise from 'chai-as-promised';

import { ValidationError } from '../errors/validation';
import { validator } from './pokemonBuy';

use(chaiAsPromise);

describe('validators/pokemonBuy', () => {
	it('should return valid', () => {
		return expect(validator.validate({ id: 1, quantity: 1 })).to.eventually.be.fulfilled;
	});

	it('should return invalid when id is not present', () => {
		return expect(validator.validate({ quantity: 1 })).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('id');
			expect(err.data[0].type).to.be.equals('any.required');
		});
	});

	it('should return invalid when id is not a number', () => {
		return expect(validator.validate({ id: 'a', quantity: 1 })).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('id');
			expect(err.data[0].type).to.be.equals('number.base');
		});
	});

	it('should return invalid when id is not an integer', () => {
		return expect(validator.validate({ id: 2.2, quantity: 1 })).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('id');
			expect(err.data[0].type).to.be.equals('number.integer');
		});
	});

	it('should return invalid when id is less than 1', () => {
		return expect(validator.validate({ id: 0, quantity: 1 })).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('id');
			expect(err.data[0].type).to.be.equals('number.min');
		});
	});

	it('should return invalid when quantity is not present', () => {
		return expect(validator.validate({ id: 1 })).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('quantity');
			expect(err.data[0].type).to.be.equals('any.required');
		});
	});

	it('should return invalid when quantity is not a number', () => {
		return expect(validator.validate({ quantity: 'a', id: 1 })).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('quantity');
			expect(err.data[0].type).to.be.equals('number.base');
		});
	});

	it('should return invalid when quantity is not an integer', () => {
		return expect(validator.validate({ quantity: 2.2, id: 1 })).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('quantity');
			expect(err.data[0].type).to.be.equals('number.integer');
		});
	});

	it('should return invalid when quantity is less than 1', () => {
		return expect(validator.validate({ quantity: 0, id: 1 })).to.eventually.be.rejected.then((err: ValidationError) => {
			expect(err.data[0].path).to.be.equals('quantity');
			expect(err.data[0].type).to.be.equals('number.min');
		});
	});
});
