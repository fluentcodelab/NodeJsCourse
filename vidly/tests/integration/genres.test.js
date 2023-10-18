import request from "supertest";
import { server } from "../../index";

let serverInstance;

describe(`/api/genres`, () => {
  beforeEach(() => {
    serverInstance = server;
  });
  afterEach(async () => {
    await serverInstance.close();
  });

  describe(`GET /`, () => {
    it(`should return all genres`, async () => {
      const res = await request(serverInstance).get(`/api/genres`);
      expect(res.status).toBe(200);
    });
  });
});
