import { use, request, expect } from "chai";
import chaiHttp from "chai-http";
import app from "../server";

use(chaiHttp);

describe("Sign Up User", () => {
  it("should create a new user", (done) => {
    request(app)
      .post("/api/v1/auth/signup")
      .send({
        user_name: "John D3",
        email: "johndoe3@example.com",
        password: "12345",
        mobile_no: "+919380409514",
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});
