import mongoose from "mongoose";
import request from "supertest";
import moment from "moment";
import { server } from "../../index.js";
import { Rental } from "../../models/rental.js";
import { User } from "../../models/user.js";
import { Movie } from "../../models/movie.js";

describe("/api/returns", () => {
  let serverInstance;
  let customerId;
  let movieId;
  let rental;
  let movie;
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

    movie = new Movie({
      _id: movieId,
      title: "Movie title",
      dailyRentalRate: 2,
      genre: { name: `Science Fiction` },
      numberInStock: 10,
    });
    await movie.save();

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
    await Movie.deleteMany({});
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

  it("should return 400 if return is already processed", async () => {
    rental.dateReturned = new Date();
    await rental.save();

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 200 if we have a valid request", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });

  it("should set the returnDate if input is valid", async () => {
    const res = await exec();

    const rentalInDb = await Rental.findById(rental._id);

    const diff = new Date() - rentalInDb.dateReturned;
    expect(diff).toBeLessThan(10 * 1000);
  });

  it("should set the rentalFee if input is valid", async () => {
    rental.dateOut = moment().add(-7, `days`).toDate();
    await rental.save();

    const res = await exec();

    const rentalInDb = await Rental.findById(rental._id);

    expect(rentalInDb.rentalFee).toBe(14);
  });

  it("should increase the movie stock if input is valid", async () => {
    const res = await exec();

    const movieInDb = await Movie.findById(movieId);
    expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
  });

  it("should return the rental if input is valid", async () => {
    const res = await exec();

    const rentalInDb = await Rental.findById(rental._id);
    // Option 1
    // expect(res.body).toHaveProperty(`dateOut`);
    // expect(res.body).toHaveProperty(`dateReturned`);
    // expect(res.body).toHaveProperty(`rentalFee`);
    // expect(res.body).toHaveProperty(`customer`);
    // expect(res.body).toHaveProperty(`movie`);

    // Option 2 (Better)
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining([
        `dateOut`,
        `dateReturned`,
        `rentalFee`,
        `customer`,
        `movie`,
      ]),
    );
  });
});
