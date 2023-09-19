import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: authorSchema,
  }),
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  // Option 1
  // const course = await Course.findById(courseId);
  // // The embedded document 'author' state can only be modified through its parent document
  // course.author.name = "John Doe";
  // course.save();

  // Option 2
  const course = await Course.updateOne(
    { _id: courseId },
    {
      // unset removes the subdocument
      // $unset: { "author": '' },
      $set: { "author.name": "Jane Doe" },
    },
  );

  console.log(course);
}

// createCourse("Node Course", new Author({ name: "Mosh" }));

updateAuthor("6508fad6fad2b79e552e8ca3");
