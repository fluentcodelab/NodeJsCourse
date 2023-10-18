import request from "supertest";
import { server } from "../../index.js";
import { User } from "../../models/user.js";
import { Genre } from "../../models/genre.js";

let serverInstance;

describe(`auth middleware`, () => {
  let token;
  beforeEach(async () => {
    serverInstance = server;
    token = new User().generateAuthToken();
  });
  afterEach(async () => {
    await serverInstance.close();
    await Genre.deleteMany({});
  });

  const exec = () => {
    return request(serverInstance)
      .post(`/api/genres`)
      .set(`x-auth-token`, token)
      .send({ name: `genre1` });
  };

  it(`should return 401 if no token is provided`, async () => {
    token = ``;

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it(`should return 400 if token is invalid`, async () => {
    token = `a`;

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it(`should return 200 if token is valid`, async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});
