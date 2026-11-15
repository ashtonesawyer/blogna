/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  
  await knex('users').insert([
    // passed => 'testpassword'
    {id: 1, email: 'ryan@gosling.com', 'passwd_hash': '$argon2id$v=19$m=65536,t=3,p=4$W3aD9FO4bOkhITP7XULHDA$VqH6R21JVxjN1JAadbP9PwzNY/DgPv2BaNW7hD0SPzs', fullname: "Ryan Gosling"}
  ]);
};
