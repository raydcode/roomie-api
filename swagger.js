import swaggerAutogen from "swagger-autogen";
import fs from "fs";
import path from "path";

const doc = {
  info: {
    version: "1.0.0",
    title: "Roomies",
    description: "The Money Tracker App with Ease to Use",
  },
  servers: [
    {
      url: "http://localhost:5000/api/v1",
      description: "local server",
    },
    {
      url: "https://roomie-raydcode.b4a.run/api/v1",
      description: "stage server",
    },
  ],
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  securityDefinitions: {
    apiKeyAuth: {
      type: "apiKey",
      in: "header", // can be "header", "query" or "cookie"
      name: "X-API-KEY", // name of the header, query parameter or cookie
      description: "any description...",
    },
  },
};

const outputFile = "./swagger-output.json";

let privateRoutes = path.join(__dirname + "/src/routers/v1/private");
let publicRoutes = path.join(__dirname + "/src/routers/v1/public");
const privateEndpoints = fs
  .readdirSync(privateRoutes, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((item) => `${privateRoutes}/${item.name}/index.js`);

const publicEndpoints = fs
  .readdirSync(publicRoutes, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((item) => `${publicRoutes}/${item.name}/index.js`);

const endponitsFiles = [...privateEndpoints, ...publicEndpoints];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endponitsFiles, doc);
