
exports.up = function(knex) {
  return knex.schema.createTable('todos', tbl => {
    tbl.increments();
    tbl.text('description').notNullable();
    tbl.boolean('completed').notNullable();
  })  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('todos') 
};
