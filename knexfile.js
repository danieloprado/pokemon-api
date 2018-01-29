module.exports = {

	development: {
		client: 'sqlite3',
		connection: {
			filename: './.data/database.db'
		},
		seeds: {
			directory: './migrations/seeds'
		},
		debug: false
	},

	test: {
		client: 'sqlite3',
		connection: {
			filename: ':memory:'
		},
		seeds: {
			directory: './migrations/seeds'
		},
		debug: false
	},

	production: {
		client: 'sqlite3',
		connection: {
			filename: './.data/database.db'
		},
		seeds: {
			directory: './migrations/seeds'
		},
		debug: false
	}

};
