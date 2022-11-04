let app = require("../src/app");
let supertest = require("supertest");
let server = supertest(app);
const { fail } = require("assert");

describe("Testing authentication", () => {
  it("should return a jwt token when logging in", () => {
    const user = {
      email: `victor@teste.com`,
      password: "12345",
    };

    return server
      .post("/auth")
      .send(user)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.token).toBeDefined();
      })
      .catch((error) => {
        fail(error);
      });
  });

  it("shouldnt return a jwt token if the user email is incorrect", () => {
    const user = {
      email: `21312321@teste.com`,
      password: "12345",
    };

    return server
      .post("/auth")
      .send(user)
      .then((res) => {
        expect(res.statusCode).toEqual(403);
        expect(res.body.errors.email).toEqual("Incorrect Email");
      })
      .catch((error) => {
        fail(error);
      });
  });

  it("shouldnt return a jwt token if the user password is incorrect", () => {
    const user = {
      email: `victor@teste.com`,
      password: "1",
    };

    return server
      .post("/auth")
      .send(user)
      .then((res) => {
        expect(res.statusCode).toEqual(403);
        expect(res.body.errors.password).toEqual("Incorrect Password");
      })
      .catch((error) => {
        fail(error);
      });
  });
});
