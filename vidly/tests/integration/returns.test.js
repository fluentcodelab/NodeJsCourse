import mongoose from "mongoose";
import request from "supertest";
import { server } from "../../index.js";
import { Rental } from "../../models/rental.js";

describe("/api/returns", () => {
  let serverInstance;
  let customerId;
  let movieId;
  let rental;

  beforeEach(async () => {
    serverInstance = server;
    customerId = new mongoose.Types.ObjectId();
    movieId = new mongoose.Types.ObjectId();

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
    const res = await request(serverInstance)
      .post("/api/returns")
      .send({ customerId, movieId });

    expect(res.status).toBe(401);
  });
});
