import express from "express";
import moment from "moment";
import Joi from "joi";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { Rental } from "../models/rental.js";
import { Movie } from "../models/movie.js";

const router = express.Router();

router.post("/", [auth, validate(validateReturn)], async (req, res, next) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);
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

  return res.status(200).send(rental);
});

function validateReturn(input) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(input);
}

export default router;
