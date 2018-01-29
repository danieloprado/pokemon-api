exports.seed = async function(knex) {
	const { count } = await knex.count('id as count').from('pokemon').first();
	if (count > 0) return;

	const initials = ['Charmander', 'Squirtle', 'Bulbasaur'];
	for (let pokemon of initials) {
		await knex.insert({
			name: pokemon,
			price: 4,
			stock: 1
		}).returning('*').into('pokemon');
	}
}
