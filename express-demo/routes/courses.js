import Joi from "joi";
import express from "express";

const router = express.Router();

const courses = [
  { id: 1, name: "Course A" },
  { id: 2, name: "Course B" },
  { id: 3, name: "Course C" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.post("/", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.status(201).send(course);
});

router.get("/:id", (req, res) => {
  const course = courses.find((x) => x.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send(`No match found for course with ID ${req.params.id}`);
  res.send(course);
});

router.put("/:id", (req, res) => {
  const course = courses.find((x) => x.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send(`No match found for course with ID ${req.params.id}`);

  const { error } = validateCourse(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  course.name = req.body.name;

  res.send(course);
});

router.delete("/:id", (req, res) => {
  const course = courses.find((x) => x.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send(`No match found for course with ID ${req.params.id}`);

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}

export default router;
