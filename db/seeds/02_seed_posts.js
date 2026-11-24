/* eslint-disable camelcase */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function seed(knex) {
  // Deletes ALL existing entries
  await knex('posts').del();

  await knex('posts').insert([
    {
      id: 1,
      title: 'Life may be a beach, but YOU are KENOUGH',
      content:
        'There you were, surfing through life on a wave made of hopes and dreams...\nBut suddenly, you run into a gnarly bump that sends you off your board.',
      author_id: 1,
      created_at: '2026-11-01 12:00',
      updated_at: '2026-11-01 12:00',
    },
  ]);
};
