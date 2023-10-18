import request from "supertest";
import { server } from "../../index";
import { Genre } from "../../models/genre.js";

let serverInstance;

describe(`/api/genres`, () => {
  beforeEach(() => {
    serverInstance = server;
  });
  afterEach(async () => {
    await serverInstance.close();
    await Genre.deleteMany({});
  });

  describe(`GET /`, () => {
    it(`should return all genres`, async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);

      const res = await request(serverInstance).get(`/api/genres`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === `genre1`)).toBeTruthy();
      expect(res.body.some((g) => g.name === `genre2`)).toBeTruthy();
    });
  });
});
