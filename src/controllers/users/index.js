import { Users } from "../../../models";
import { encode } from "../../utils/jwt";
import { sendEmail } from "../../utils/mail";

/**
 *  Create User and User Profile
 *  @param {Object} connection - knex Instance
 *  @param {String} user_name -  name of the user
 *  @param {String} email - email of the user
 *  @param {String} password - password of the user
 *  @param {String} mobile_no 	- mobile number
 */
export const createUser = ({
  connection,
  user_name,
  password,
  email,
  mobile_no,
}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Users.query(connection).insertGraph({
        user_name,
        password,
        email,
        mobile_no,
        user_profile: {
          full_name: user_name,
          email,
          mobile_no,
        },
      });

      const message = `Welcome to Roomie : ${user_name}`;

      resolve(message);

      await sendEmail({
        email: email,
        subject: message,
        message: `Hi ${user_name} , We very happy to welcome you to Roomie THE EXPENSE TRACKER APPLICATION ...`,
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 *  Generate User Access Token from JWT_SECRET
 *  @param {Object} user - Identified User Model Object
 *  @param {Object} connection - knex instance
 */
const generateUserAuthToken = async ({ connection, user, expiry_time }) => {
  const { id } = await user.$query(connection).select("id");
  return encode({ id }, expiry_time);
};

/**
 *  Update Identified User
 *  @param {Object} user - Identified User Model Object
 *  @param {Object} connection - knex instance
 *  @param {String} email - Email of the user
 *  @param {Object} update_fields - Required fields for update
 */

const updateUser = async ({ user, connection, update_fields }) =>
  await user.$query(connection).update(update_fields);

/**
 *  Verify that the user is valid
 *  @param {Object} connection - knex instance
 *  @param {String} user_name - email of the user
 *  @param {String} password - password of the user
 */

export const verifyUser = ({ connection, user_name, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Users.query(connection).first().where({ user_name });

      if (!user)
        return reject({ error: "Invalid Credentials", statusCode: 401 });

      const is_verified = await user.verifyPassword(password);
      if (!is_verified)
        return reject({ error: "Invalid Credentials", statusCode: 401 });

      resolve({
        message: "Access Granted !!",
        token: await generateUserAuthToken({ connection, user }),
      });

      await updateUser({
        user,
        connection,
        update_fields: { last_logged_in: new Date() },
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

/**
 *  Forget User Password
 *  @param {Object} connection - knex instance
 *  @param {String} email - email of the user
 */
export const forgetPassword = ({ connection, email }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Users.query(connection).first().where({ email });

      const token = await generateUserAuthToken({
        connection,
        user,
        expiry_time: "1h",
      });

      await sendEmail({
        email: email,
        subject: `Reset Password Link`,
        message: `Hi ${user.user_name} , reset password link : https://roomie.dev.raydcode.in/resetpassword?token=${token}`,
      });
      resolve();
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

/**
 *  Reset User Password
 *  @param {Object} connection - knex instance
 *  @param {String} email - email of the user
 *  @param {String} password - new password of the user
 */

export const resetPassword = ({ connection, email, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Users.query(connection).first().where({ email });

      updateUser({ user, connection, update_fields: { password } });

      resolve("Your password has been reset successfully!");
    } catch (error) {
      reject(error);
    }
  });
};
