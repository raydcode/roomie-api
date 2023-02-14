import knex from "knex";

import knexFile from "./knexfile";

const DB = knex(knexFile[process.env.NODE_ENV]);

export default DB;
