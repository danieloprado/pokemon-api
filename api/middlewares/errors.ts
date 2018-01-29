import { NextFunction, Request, Response } from 'express';

export function notFound(req: Request, res: Response, next: NextFunction): any {
	return res.status(404).json('Nenhum rota encontrada');
}

export function parser(err: any, req: Request, res: Response, next: NextFunction): any {
	if (err.validationError || err.clientError) {
		return res.status(400).json({ message: err.message, data: err.data });
	}

	console.log('\n\n\n********************** ERROR *******************');
	console.log(req.body);
	console.error(err.message);
	console.error(err.data);
	console.error(err.stack);
	console.log('********************** END ERROR *******************\n');

	next(err);
}

export function developmentError(err: any, req: Request, res: Response, next: NextFunction): any {
	if (typeof err === 'string') {
		err = { message: err };
	}

	res.status(err.status || 500).send({
		message: err.message,
		stack: err.stack
	});
}

export async function productionError(err: any, req: Request, res: Response, next: NextFunction): Promise<void> {
	err.status = err.status || 500;

	if (err.status === 500) {
		//TODO: implement log erro like sentry.io
	}

	res.status(err.status).send('Internal Server Error');
}
