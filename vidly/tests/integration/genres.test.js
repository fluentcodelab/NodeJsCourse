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

  describe(`GET /:id`, () => {
    it(`should return a genre if valid id is passed`, async () => {
      const genre = new Genre({ name: `genre1` });
      await genre.save();

      const res = await request(serverInstance).get(`/api/genres/${genre._id}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty(`name`, genre.name);
    });

    it(`should return 404 if invalid id is passed`, async () => {
      const res = await request(serverInstance).get(`/api/genres/1`);

      expect(res.status).toBe(404);
    });
  });

  describe(`POST /`, () => {
    it(`should return 401 if client is not logged in`, async () => {
      const res = await request(server)
        .post(`/api/genres`)
        .send({ name: `genre1` });

      expect(res.status).toBe(401);
    });
  });
});
