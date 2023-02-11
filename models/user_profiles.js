const { Model } = require("objection");

class UserProfiles extends Model {
  // Table name is the only required property.

  static get tableName() {
    return "user_profiles";
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + "/users",
        join: {
          from: "user_profiles.user_id",
          to: "private.users.id",
        },
      },
    };
  }
}
module.exports = UserProfiles;
