let app = require("../src/app");
let supertest = require("supertest");
let server = supertest(app);
let { randomUUID } = require("crypto");
const { fail } = require("assert");

describe("create user", () => {
  it("Should create an new user", () => {
    const user = {
      name: `victor-${randomUUID()}`,
      email: `${Date.now()}@gmail.com`,
      password: "12345",
    };

    return server
      .post("/user")
      .send(user)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.email).toEqual(user.email);
      })
      .catch((error) => {
        fail(error);
      });
  });
  it("Shouldn't create an new user with empty fields", () => {
    const user = {
      name: "",
      email: "",
      password: "",
    };

    return server
      .post("/user")
      .send(user)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
      })
      .catch((error) => {
        fail(error);
      });
  });
});
