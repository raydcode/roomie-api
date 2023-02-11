/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  await knex.schema.withSchema("private").alterTable("users", function (table) {
    table.unique("user_name");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.withSchema("private").alterTable("users", function (table) {
    table.dropUnique("user_name");
  });
};
