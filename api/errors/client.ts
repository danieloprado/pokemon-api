export class ClientError extends Error {
	public readonly clientError: boolean;
	public data: any = null;

	constructor(type: string, data: any = {}) {
		super(type);
		this.clientError = true;
		this.data = data;
	}
}
