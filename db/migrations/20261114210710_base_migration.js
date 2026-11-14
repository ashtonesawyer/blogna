/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('passwd_hash').notNullable();
    table.string('fullname');
  });

  await knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.integer('author_id').references('users.id').notNullable().onDelete('CASCADE');
    table
      .timestamp('created_at', { useTz: false, precision: 0 })
      .defaultTo(knex.fn.now(0))
    table
      .timestamp('updated_at', { useTz: false, precision: 0 })
      .defaultTo(knex.fn.now(0))

    table.index('author_id');
  });

  await knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.string('content').notNullable();
    table.integer('author_id').references('users.id').notNullable().onDelete('CASCADE');
    table.integer('post_id').references('posts.id').notNullable().onDelete('CASCADE');
    table
      .timestamp('created_at', { useTz: false, precision: 0 })
      .defaultTo(knex.fn.now(0))
    table
      .timestamp('updated_at', { useTz: false, precision: 0 })
      .defaultTo(knex.fn.now(0))

    table.index('author_id');
    table.index('post_id');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function down(knex) {
  await knex.schema.dropTable('comments')
  await knex.schema.dropTable('posts')
  await knex.schema.dropTable('users')
};
