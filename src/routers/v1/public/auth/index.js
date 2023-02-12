import { Router } from "express";
import { validationResult } from "express-validator";
import {
  createUser,
  verifyUser,
  resetPassword,
  forgetPassword,
} from "../../../../controllers/users";
import { forgetPasswordSchema, signUpSchema, verifyUserSchema } from "./schema";

const routes = Router();

routes.post("/signup", signUpSchema, async (req, res) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.path = '/auth/signup'
   * #swagger.requestBody = {
            required: true,
            "@content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            user_name: {
                                type: "string"
                            },
                            password: {
                                type: "string"
                            },
                            email: {
                                type: "string"
                            },
                            mobile_no: {
                                type: "string"
                            }

                        },
                        required: ["user_name", "password","email","mobile_no"]
                    }
                }
            } 
        }
   */

  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ type: "error", errors });
    }

    let response = await createUser(req.body);
    res.status(201).send({ type: "success", response });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).send(error);
  }
});

routes.post("/login", verifyUserSchema, async (req, res) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.path = '/auth/login'
   * #swagger.requestBody = {
            required: true,
            "@content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            user_name: {
                                type: "string"
                            },
                            password: {
                                type: "string"
                            }

                        },
                        required: ["user_name", "password"]
                    }
                }
            } 
        }
   */

  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ type: "error", errors });
    }

    let response = await verifyUser(req.body);
    res.status(200).send({ type: "success", response });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).send(error);
  }
});

routes.post("/forgetpassword", forgetPasswordSchema, async (req, res) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.path = '/auth/forgetpassword'
   * #swagger.requestBody = {
            required: true,
            "@content": {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            email: {
                                type: "string"
                            }
                        },
                        required: ["email"]
                    }
                }
            } 
        }
   */
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ type: "error", errors });
    }

    let response = await forgetPassword(req.body);
    res.status(200).send({ type: "success", response });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode).send(error);
  }
});

// routes.post("/reset-password", verifyUserSchema, async (req, res) => {
//   /**
//    * #swagger.tags = ['Auth']
//    * #swagger.path = '/auth/reset-password'
//    */
//   try {
//     let errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).send({ type: "error", errors });
//     }

//     let response = await resetPassword(req.body);
//     res.status(200).send({ type: "success", response });
//   } catch (error) {
//     console.log(error);
//     res.status(error.statusCode).send(error);
//   }
// });

module.exports = routes;
