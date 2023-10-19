import { server } from "../../index.js";
import { Rental } from "../../models/rental.js";
import mongoose from "mongoose";

describe(`/api/returns`, () => {
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
        name: `John Doe`,
        phone: `444-111-8523`,
      },
      movie: {
        _id: movieId,
        title: `Movie title`,
        dailyRentalRate: 2,
      },
    });
    await rental.save();
  });
  afterEach(async () => {
    await serverInstance.close();
    await Rental.deleteMany({});
  });

  it(`should work!`, async () => {
    const result = await Rental.findById(rental._id);
    expect(result).not.toBeNull();
  });
});
