import * as joiCore from 'joi';

import { ValidationError } from '../errors/validation';

export const joi = joiCore;

export abstract class BaseValidator<T> {
	protected options: joiCore.ValidationOptions = { abortEarly: false, stripUnknown: <any>{ objects: true, arrays: false } };
	protected schema: joiCore.ObjectSchema;

	constructor(schema: joiCore.ObjectSchema) {
		this.schema = schema;
	}

	public validate(model: any): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			joi.validate(model, this.schema, this.options, (err: any, value: T) => {
				if (!err) {
					return resolve(value);
				}

				reject(new ValidationError(err.details.map((err: any) => {
					err.path = err.path.join('.');
					return err;
				})));
			});
		});
	}
}
