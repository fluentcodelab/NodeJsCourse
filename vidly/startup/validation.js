import Joi from "joi";
import objectId from "joi-objectid";

export function setValidation() {
  Joi.objectId = objectId(Joi);
}