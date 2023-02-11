/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  await knex.schema.createTableIfNotExists(
    "categories_master",
    function (table) {
      table.increments("id").primary();
      table.string("name");
      table.boolean("is_active").defaultTo(true);
      table.boolean("is_deleted").defaultTo(false);
      table.uuid("created_by").references("id").inTable("user_profiles");
      table.uuid("updated_by").references("id").inTable("user_profiles");
      table.dateTime("created_at").defaultTo(knex.fn.now());
      table.dateTime("updated_at").defaultTo(knex.fn.now());
    }
  );
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("categories_master");
};
