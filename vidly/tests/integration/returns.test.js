import mongoose from "mongoose";
import request from "supertest";
import { server } from "../../index.js";
import { Rental } from "../../models/rental.js";
import { User } from "../../models/user.js";

describe("/api/returns", () => {
  let serverInstance;
  let customerId;
  let movieId;
  let rental;
  let token;

  const exec = () => {
    return request(serverInstance)
      .post("/api/returns")
      .set(`x-auth-token`, token)
      .send({ customerId, movieId });
  };

  beforeEach(async () => {
    serverInstance = server;
    customerId = new mongoose.Types.ObjectId();
    movieId = new mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: "John Doe",
        phone: "444-111-8523",
      },
      movie: {
        _id: movieId,
        title: "Movie title",
        dailyRentalRate: 2,
      },
    });
    await rental.save();
  });
  afterEach(async () => {
    await serverInstance.close();
    await Rental.deleteMany({});
  });

  it("should return 401 if client is not logged in", async () => {
    token = ``;

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("should return 400 if customerId is not provided", async () => {
    customerId = ``;

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 400 if movieId is not provided", async () => {
    movieId = ``;

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 404 if no rental found for the customer/movie", async () => {
    await Rental.deleteMany({});

    const res = await exec();

    expect(res.status).toBe(404);
  });
});
