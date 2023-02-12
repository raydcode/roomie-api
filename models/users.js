const { Model, compose } = require("objection");

// import the plugin
const Password = require("objection-password")({
  allowEmptyPassword: true,
});
const Unique = require("objection-unique")({
  fields: ["email", "user_name"],
  identifiers: ["id"],
});

const Mixins = compose(Password, Unique);

class Users extends Mixins(Model) {
  // Table name is the only required property.

  static get tableName() {
    return "private.users";
  }
  static get relationMappings() {
    return {
      user_profile: {
        relation: Model.HasOneRelation,
        modelClass: __dirname + "/user_profiles",
        join: {
          from: "private.users.id",
          to: "user_profiles.user_id",
        },
      },
    };
  }
}
module.exports = Users;
