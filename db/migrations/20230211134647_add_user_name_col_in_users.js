/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  await knex.schema.withSchema("private").alterTable("users", function (table) {
    table.string("user_name");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.withSchema("private").alterTable("users", function (table) {
    table.dropColumn("user_name");
  });
};
