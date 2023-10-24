import express from "express";
import { auth } from "../middleware/auth.js";
import { Rental } from "../models/rental.js";
import moment from "moment";
import { Movie } from "../models/movie.js";

const router = express.Router();

router.post("/", auth, async (req, res, next) => {
  if (!req.body.customerId)
    return res.status(400).send(`customerId not provided.`);
  if (!req.body.movieId) return res.status(400).send(`movieId not provided.`);

  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });
  if (!rental) return res.status(404).send(`Rental not found.`);

  if (rental.dateReturned)
    return res.status(400).send(`Return already processed.`);

  rental.dateReturned = new Date();
  const rentalDays = moment().diff(rental.dateOut, `days`);
  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
  await rental.save();

  await Movie.updateOne(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 },
    },
  );

  return res.status(200).send();
});

export default router;
