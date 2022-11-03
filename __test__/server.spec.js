let app = require("../src/app");
let supertest = require("supertest");
let server = supertest(app);

describe("testing server", () => {
  it("Should reply at port 3131", () => {
    return server.get("/").then((res) => expect(res.statusCode).toEqual(200));
  });
});
