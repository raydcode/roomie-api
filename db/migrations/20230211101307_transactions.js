/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = async function (knex) {
  await knex.schema.createTableIfNotExists("transactions", function (table) {
    table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
    table.boolean("is_income").defaultTo(false);
    table.integer("category_id").references("id").inTable("categories_master");
    table
      .integer("sub_category_id")
      .references("id")
      .inTable("sub_categories_master");
    table.text("notes");
    table.boolean("is_active").defaultTo(true);
    table.boolean("is_deleted").defaultTo(false);
    table.uuid("created_by").references("id").inTable("user_profiles");
    table.uuid("updated_by").references("id").inTable("user_profiles");
    table.dateTime("created_at").defaultTo(knex.fn.now());
    table.dateTime("updated_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("transactions");
};
