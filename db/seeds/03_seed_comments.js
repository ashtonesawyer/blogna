/* eslint-disable camelcase */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async function seed(knex) {
  // Deletes ALL existing entries
  await knex('comments').del();

  await knex('comments').insert([
    {
      id: 1,
      content: 'You truly are KENOUGH, my fellow Ken.',
      author_id: 2,
      post_id: 1,
      created_at: '2026-11-02 12:00',
      updated_at: '2026-11-02 12:00',
    },
  ]);
};
