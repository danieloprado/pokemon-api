exports.up = async function(knex) {
	await knex.schema.createTable('pokemon', function(table) {
		table.increments('id').primary();
		table.string('name', 150).notNullable();
		table.integer('price').notNullable();
		table.integer('stock').nullable().defaultTo(0);
	});
};

exports.down = async function(knex) {
	await knex.schema.dropTable('pokemon');
};
