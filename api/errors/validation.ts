export class ValidationError extends Error {
	public readonly validationError: boolean;
	public data: {
		message: string,
		path: string,
		type: string;
	}[] = null;

	constructor(data: any) {
		super('validation-error');
		this.validationError = true;
		this.data = data;
	}
}
